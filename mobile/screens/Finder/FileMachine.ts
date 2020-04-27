import { Machine, assign, Interpreter, Actor, sendParent, send } from 'xstate';

import { Item } from '@types/item';
import { fetchItemContents } from 'services/directory';

export type FileEvent =
  | { type: 'rename' }
  | { type: 'changeName'; name: string }
  | { type: 'select' }
  | { type: 'deselect' };
export type FileAction = 'copy' | 'share' | 'move' | 'rename' | 'delete' | 'addToFavorites';
export type FileActor = Actor<Item, FileEvent> | Interpreter<Item>;

export const FileMachine = Machine<Item, FileEvent>(
  {
    id: 'file',
    type: 'parallel',
    states: {
      listing: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              selecting: 'selecting',
            },
          },
          selecting: {
            initial: 'notSelected',
            on: {
              cancel: 'idle',
            },
            states: {
              notSelected: {
                on: {
                  select: {
                    target: 'selected',
                  },
                },
              },
              selected: {
                on: {
                  select: {
                    target: 'notSelected',
                  },
                },
              },
            },
          },
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
          ready: {
            initial: 'idle',
            states: {
              idle: {
                on: {
                  view: 'viewing',
                },
              },
              viewing: {
                states: {
                  idle: {
                    on: {
                      edit: 'editing',
                    },
                  },
                  editing: {
                    initial: 'idle',
                    states: {
                      idle: {
                        on: {
                          rename: '',
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
                },
              },
            },
          },
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
      isUnloaded: ctx => !!ctx.meta.unloaded || !!ctx.contents,
    },
  },
);
