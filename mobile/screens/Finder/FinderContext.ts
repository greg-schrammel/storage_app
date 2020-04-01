import { createContext, useContext } from 'react';
import { FinderState, FinderInterpreter } from './FinderMachine';

const FinderContext = createContext(null);

export const useFinder = () => {
  return useContext<[FinderState, FinderInterpreter['send'], FinderInterpreter]>(FinderContext);
};

export const FinderProvider = FinderContext.Provider;
