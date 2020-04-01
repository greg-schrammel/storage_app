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
      editing: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              rename: 'renaming',
              // select: {
              //   target: 'selected',
              //   actions: ctx => send('select', { to: 'edit', id: ctx.id }),
              // },
            },
          },
          selected: {
            // on: {
            //   select: {
            //     target: 'idle',
            //     actions: ctx => send('deselect', { to: 'edit', id: ctx.id }),
            //   },
            // },
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
      isUnloaded: ctx => !!ctx.meta.unloaded || !!ctx.contents,
    },
  },
);
