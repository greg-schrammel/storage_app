import { Machine, assign, State, Interpreter, spawn } from 'xstate';

import { Item } from '@types/item';
import { listenFolder } from 'services/directory';
import { SortByKeys } from './components/SortBy';
import { EditEvent, EditMachine } from './EditMachine';
import { FileActor, FileMachine } from './FileMachine';
import { SearchEvent, SearchMachine } from './screens/Searching/SearchMachine';

type UpdateDataEvent = { type: 'updateData'; data: Array<Item> };
export type FinderEvent =
  | { type: 'edit' }
  | { type: 'done' }
  | { type: 'search' }
  | { type: 'sort'; by: SortByKeys }
  | { type: 'add'; item: Item }
  | { type: 'addFolder' }
  | { type: 'addMedia' }
  | UpdateDataEvent
  | SearchEvent
  | EditEvent;

interface FinderContext {
  folder: Item['id'];
  data?: Array<{ id: Item['id']; ref: FileActor }>;
  sortBy: SortByKeys;
}

const FinderMachine = Machine<FinderContext, FinderEvent>(
  {
    id: 'directory',
    initial: 'loading',
    context: {
      folder: 'root',
      data: [],
      sortBy: 'name' as SortByKeys,
    },
    invoke: {
      src: 'listenFolder',
    },
    states: {
      loading: {
        on: {
          updateData: {
            actions: 'updateData',
            target: 'idle',
          },
        },
      },
      idle: {
        on: {
          '': [{ cond: 'hasData', target: 'listing' }, { target: 'noData' }],
        },
      },
      listing: {
        on: {
          edit: 'editing',
          add: 'adding',
        },
      },
      noData: {
        on: {
          // edit: '',
          addFolder: 'adding.folder',
          addMedia: 'adding.media',
        },
      },
      editing: {
        invoke: {
          id: 'edit',
          src: EditMachine,
          autoForward: true,
          onDone: 'idle',
          onError: 'idle',
        },
      },
      adding: {
        initial: 'picking',
        states: {
          picking: {
            on: {
              addFolder: 'folder',
              addMedia: 'media',
            },
          },
          folder: {},
          media: {},
        },
        on: {
          confirm: {
            target: 'idle',
            actions: 'add',
          },
          cancel: {
            target: 'idle',
          },
        },
      },
      searching: {
        invoke: {
          src: SearchMachine,
          onDone: 'idle',
        },
      },
      open: {},
    },
    on: {
      search: 'searching',
      sort: {
        actions: 'sort',
      },
      updateData: {
        actions: 'updateData',
      },
    },
  },
  {
    guards: {
      hasData: ctx => ctx.data && ctx.data.length > 0,
    },
    actions: {
      sort: (ctx, e) => null, // assign({ items: ctx.items.sort() }),
      add: (ctx, e) => null,
      updateData: assign({
        data: (ctx, e: UpdateDataEvent) => [
          ...ctx.data,
          ...e.data.map(item => ({
            id: item.id,
            ref: spawn(FileMachine.withContext(item), item.id),
          })),
        ],
      }),
    },
    services: {
      listenFolder: ctx => cb =>
        listenFolder(ctx.folder, newData => cb({ type: 'updateData', data: newData })),
    },
  },
);
export type FinderState = State<FinderContext, FinderEvent>;
export type FinderInterpreter = Interpreter<FinderContext, {}, FinderEvent>;

export default FinderMachine;
