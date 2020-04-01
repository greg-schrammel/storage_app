import { Machine, assign } from 'xstate';

export type SearchEvent = { type: 'searchChange'; search: string } | { type: 'cancel' };

export const SearchMachine = Machine<{ search: string }, SearchEvent>({
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
