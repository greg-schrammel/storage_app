import { Machine, assign, send, State, Interpreter } from 'xstate';

import { Item } from './components/ListItem';
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

type PressItemEvent = { type: 'pressItem'; id: string };
export type FolderEvent =
  | SearchEvent
  | PressItemEvent
  | BulkEvents
  | { type: 'toggleSelecting' }
  | { type: 'search' }
  | { type: 'sort'; by: SortByKeys }
  | { type: 'add'; item: Item };

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
          add: {
            actions: ['addItem'],
          },
          pressItem: 'open',
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
      sort: (ctx, e) => null,
      addItem: (ctx, e) => assign({ ...ctx, items: [...ctx.items, e] }),
    },
  },
);
export type FolderState = State<FolderContext, FolderEvent>;
export type FolderInterpreter = Interpreter<FolderContext, {}, FolderEvent>;

export default FolderMachine;
