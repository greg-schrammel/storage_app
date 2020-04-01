import { Machine, assign, Interpreter } from 'xstate';

import { Item } from '@types/item';

type ConfirmationEvent = { type: 'confirm' } | { type: 'cancel' };
type EditActionEvent =
  | { type: 'select'; id: Item['id'] }
  | { type: 'deselect'; id: Item['id'] }
  | { type: 'delete'; id: Item['id'] }
  | { type: 'move'; id: Item['id'] };
interface EditContext {
  selected: Array<string>;
}
export type EditEvent = EditActionEvent | ConfirmationEvent;

export type EditInterpreter = Interpreter<EditContext, {}, EditEvent>;

export const EditMachine = Machine<EditContext, EditEvent>(
  {
    id: 'edit',
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
          deselect: {
            actions: 'deselect',
          },
          delete: 'deleting',
          move: 'moving',
          cancel: 'end',
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
      end: {
        type: 'final',
      },
    },
    on: {
      cancel: 'selecting',
    },
  },
  {
    actions: {
      deselect: assign({
        selected: (ctx, e: EditActionEvent) => ctx.selected.filter(i => i !== e.id),
      }),
      select: assign({
        selected: (ctx, e: EditActionEvent) => [...ctx.selected, e.id],
      }),
    },
    // delete: ctx => deleteItems(ctx.seleted),
    // move: (ctx, e) => moveItems(e.to, ctx.selected)
  },
);
