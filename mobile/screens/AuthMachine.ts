import { Machine } from 'xstate';

export const AuthMachine = Machine(
  {
    initial: 'loading',
    states: {
      loading: {
        on: {
          '': [{ target: 'app', cond: 'isAuthenticated' }, { target: 'authenticating' }],
        },
      },
      authenticating: {
        onDone: 'app',
      },
      app: {},
    },
  },
  {
    guards: {
      isAuthenticated: () => true,
    },
  },
);

export default AuthMachine;
