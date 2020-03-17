import { Machine, assign, send, State, Interpreter } from 'xstate';

import { Item, uid } from './components/ListItem';
import { SortByKeys } from './components/SortBy';

type SearchEvent = { type: 'searchChange'; search: string } | { type: 'cancel' };

const SearchMachine = Machine<{ search: string }, SearchEvent>({
  id: 'search',
  initial: 'searching',
  context: {
    search: '',
  },
  states: {
    searching: {
      on: {
        cancel: 'canceled',
        searchChange: {
          actions: assign({ search: (_ctx, e) => e.search }),
        },
      },
    },
    canceled: {},
  },
});

export type FolderEvent =
  | SearchEvent
  | BulkEvents
  | { type: 'toggleSelecting' }
  | { type: 'search' }
  | { type: 'sort'; by: SortByKeys }
  | { type: 'add'; item: Item }
  | { type: 'pressItem'; id: uid }
  | { type: 'addFolder' }
  | { type: 'addMedia' };

interface FolderContext {
  parent: 'string' | null;
  items: Array<Item>;
  sortBy: SortByKeys;
}

type BulkEvents = { type: 'select'; id: string };
interface BulkActionsContext {
  selected: Array<string>;
}
const BulkActionsMachine = Machine<BulkActionsContext, BulkEvents>(
  {
    id: 'bulk',
    initial: 'selecting',
    context: {
      selected: [],
    },
    states: {
      selecting: {
        on: {
          select: {
            actions: 'select',
          },
        },
      },
      done: {},
    },
  },
  {
    actions: {
      select: assign({
        selected: (ctx, e) =>
          ctx.selected.includes(e.id)
            ? ctx.selected.filter(i => i !== e.id)
            : [...ctx.selected, e.id],
      }),
    },
  },
);

const FolderMachine = Machine<FolderContext, FolderEvent>(
  {
    id: 'folder',
    initial: 'idle',
    context: {
      parent: null,
      items: [],
      sortBy: 'name',
    },
    states: {
      idle: {
        on: {
          toggleSelecting: 'selecting',
          pressItem: 'open',
          addFolder: 'adding.folder',
          addMedia: 'adding.media',
        },
      },
      selecting: {
        invoke: {
          id: 'bulk',
          src: BulkActionsMachine,
          onDone: 'idle',
        },
        on: {
          pressItem: {
            actions: (_ctx, { id }) => send('select', { to: 'bulk', id }),
          },
          toggleSelecting: 'idle',
        },
      },
      adding: {
        states: {
          media: {},
          folder: {},
        },
        on: {
          add: {
            target: 'idle',
            actions: ['addItem'],
          },
          cancel: 'idle',
        },
      },
      searching: {
        invoke: {
          src: SearchMachine,
          onDone: 'idle',
        },
        on: {
          pressItem: 'open',
        },
      },
      open: {},
    },
    on: {
      search: 'searching',
      sort: {
        actions: 'sort',
      },
    },
  },
  {
    actions: {
      sort: (ctx, e) => null, // assign({ items: ctx.items.sort() }),
      addItem: (ctx, e) => assign({ items: [...ctx.items, e] }),
    },
  },
);
export type FolderState = State<FolderContext, FolderEvent>;
export type FolderInterpreter = Interpreter<FolderContext, {}, FolderEvent>;

export default FolderMachine;
