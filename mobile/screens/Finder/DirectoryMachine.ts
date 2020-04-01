import { Machine, assign, State, Interpreter, createMachine, spawn, Actor } from 'xstate';

import { Item } from '@types/item';
import { listenFolder, fetchItemContents } from 'services/directory';
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

type ConfirmationEvent = { type: 'confirm' } | { type: 'cancel' };
type BulkActionEvent =
  | { type: 'select'; id: Item['id'] }
  | { type: 'delete'; id: Item['id'] }
  | { type: 'move'; id: Item['id'] };
type BulkEvent = BulkActionEvent | ConfirmationEvent;
interface BulkActionsContext {
  selected: Array<string>;
}
export type BulkInterpreter = Interpreter<BulkActionsContext, {}, BulkEvent>;

const BulkActionsMachine = Machine<BulkActionsContext, BulkEvent>(
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
          delete: 'deleting',
          move: 'moving',
        },
      },
      deleting: {
        on: {
          confirm: {
            target: 'end',
            actions: 'delete',
          },
        },
      },
      // movingMachine? (can't move to inside itself)
      moving: {
        on: {
          confirm: {
            target: 'end',
            actions: 'move',
          },
        },
      },
      end: {},
    },
    on: {
      cancel: 'seleting',
    },
  },
  {
    actions: {
      select: assign({
        selected: (ctx, e: BulkActionEvent) =>
          ctx.selected.includes(e.id)
            ? ctx.selected.filter(i => i !== e.id)
            : [...ctx.selected, e.id],
      }),
    },
    // delete: ctx => deleteItems(ctx.seleted),
    // move: (ctx, e) => moveItems(e.to, ctx.selected)
  },
);

export type ItemEvent = { type: 'rename' } | { type: 'changeName'; name: string };
export type ItemAction = 'copy' | 'share' | 'move' | 'rename' | 'delete' | 'addToFavorites';
export type ItemActor = Actor<Item, ItemEvent> | Interpreter<Item>;

const ItemMachine = createMachine<Item, ItemEvent>(
  {
    id: 'itemMachine',
    type: 'parallel',
    states: {
      editing: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              rename: 'renaming',
            },
          },
          renaming: {
            on: {
              changeName: {
                actions: (ctx, e) => [assign({ ...ctx, name: e.name })],
              },
            },
          },
          moving: {},
          deleting: {},
        },
      },
      network: {
        initial: 'initial',
        states: {
          initial: {
            on: {
              '': [
                { target: 'ready', cond: 'hasContent' },
                { target: 'unloaded', cond: 'isUnloaded' },
                { target: 'loading' },
              ],
            },
          },
          loading: {
            invoke: {
              src: 'fetchItemContents',
              onDone: 'ready',
              onError: {
                target: 'unloaded',
                actions: assign({
                  meta: (ctx, e) => ({
                    ...ctx.meta,
                    error: `${e}`,
                  }),
                }),
              },
            },
          },
          ready: {},
          unloaded: {},
        },
      },
    },
  },
  {
    actions: {
      fetchItemContents: ctx => fetchItemContents(ctx.id),
    },
    guards: {
      hasContent: ctx => !!ctx.contents,
      isUnloaded: ctx => ctx.meta.unloaded,
    },
  },
);

type UpdateDataEvent = { type: 'updateData'; data: Array<Item> };
export type DirectoryEvent =
  | { type: 'toggleSelecting' }
  | { type: 'search' }
  | { type: 'sort'; by: SortByKeys }
  | { type: 'add'; item: Item }
  | { type: 'pressItem'; id: Item['id'] }
  | { type: 'addFolder' }
  | { type: 'addMedia' }
  | UpdateDataEvent
  | SearchEvent
  | BulkEvent;

interface DirectoryContext {
  folder: Item['id'];
  data?: Array<{ id: Item['id']; ref: ItemActor }>;
  sortBy: SortByKeys;
}

const DirectoryMachine = Machine<DirectoryContext, DirectoryEvent>(
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
          toggleSelecting: 'selecting',
          pressItem: 'open',
          addFolder: 'adding.folder',
          addMedia: 'adding.media',
        },
      },
      selecting: {
        invoke: {
          src: BulkActionsMachine,
          onDone: 'idle',
        },
        on: {
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
      updateData: {
        actions: 'updateData',
      },
    },
  },
  {
    actions: {
      sort: (ctx, e) => null, // assign({ items: ctx.items.sort() }),
      addItem: (ctx, e) => null, // add e (item) to db and machine listen from db,
      updateData: assign({
        data: (ctx, e: UpdateDataEvent) => [
          ...ctx.data,
          ...e.data.map(item => ({
            id: item.id,
            ref: spawn(ItemMachine.withContext(item), item.id),
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
export type DirectoryState = State<DirectoryContext, DirectoryEvent>;
export type DirectoryInterpreter = Interpreter<DirectoryContext, {}, DirectoryEvent>;

export default DirectoryMachine;
