import { Machine, assign, State, Interpreter, spawn } from 'xstate';

import { Item } from '@types/item';
import { listenFolder } from 'services/directory';
import { SortByKeys } from './components/Sort';
import { EditEvent, EditMachine } from './EditMachine';
import { FileActor, FileMachine } from './FileMachine';
import { SearchEvent, SearchMachine } from './modals/Searching/SearchMachine';

type UpdateFilesEvent = { type: 'updateFiles'; files: Array<Item> };
type SortEvent = { type: 'sort'; by: SortByKeys; direction: 'up' | 'down' };
export type FinderEvent =
  | { type: 'edit' }
  | { type: 'done' }
  | { type: 'search' }
  | { type: 'sorting' }
  | { type: 'adding' }
  | { type: 'editing' }
  | { type: 'searching' }
  | { type: 'add'; file: Item }
  | { type: 'addFolder' }
  | { type: 'addMedia' }
  | UpdateFilesEvent
  | SortEvent
  | SearchEvent
  | EditEvent;

interface FinderContext {
  folder: Item['id'];
  parent: Item['id'] | void;
  files?: Array<{ id: Item['id']; actor: FileActor }>;
  sort: { by: SortByKeys; direction: 'up' | 'down' };
}

const FinderMachine = Machine<FinderContext, FinderEvent>(
  {
    id: 'finder',
    initial: 'loading',
    context: {
      parent: null,
      folder: 'root',
      files: [],
      sort: {
        by: 'name' as SortByKeys,
        direction: 'up',
      },
    },
    invoke: {
      src: 'listenFolder',
    },
    on: {
      updateFiles: {
        actions: 'updateFiles',
      },
    },
    states: {
      loading: {
        on: {
          updateFiles: {
            actions: 'updateFiles',
            target: 'idle',
          },
        },
      },
      idle: {
        on: {
          '': [{ cond: 'hasFiles', target: 'listing' }, { target: 'noFiles' }],
        },
      },
      listing: {
        on: {
          adding: 'adding',
          editing: '.editing',
          sorting: '.sorting',
        },
        initial: 'idle',
        states: {
          idle: {},
          sorting: {
            on: {
              sort: {
                target: 'idle',
                actions: 'sort',
              },
            },
          },
          searching: {
            invoke: {
              src: SearchMachine,
              onDone: 'idle',
            },
          },
          editing: {
            entry: ctx => ctx.files.forEach(file => file.actor.send('selecting')),
            on: {
              cancel: {
                target: 'idle',
                actions: ctx => ctx.files.forEach(file => file.actor.send('cancel')),
              },
            },
          },
        },
      },
      noFiles: {
        on: {
          // edit: '',
          addFolder: 'adding.folder',
          addMedia: 'adding.media',
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
    },
  },
  {
    guards: {
      hasFiles: ctx => ctx.files && ctx.files.length > 0,
    },
    actions: {
      sort: assign({
        files: (ctx, e: SortEvent) => sort(ctx.files, e.by, e.direction),
        sort: (_ctx, { by, direction }: SortEvent) => ({
          by,
          direction,
        }),
      }),
      add: (ctx, e) => null,
      updateFiles: assign({
        files: (ctx, e: UpdateFilesEvent) => [
          ...ctx.files,
          ...e.files.map(item => ({
            id: item.id,
            actor: spawn(FileMachine.withContext(item), item.id),
          })),
        ],
      }),
    },
    services: {
      listenFolder: ctx => cb =>
        listenFolder(ctx.folder, newFiles => cb({ type: 'updateFiles', files: newFiles })),
    },
  },
);
export type FinderState = State<FinderContext, FinderEvent>;
export type FinderInterpreter = Interpreter<FinderContext, {}, FinderEvent>;

export default FinderMachine;
