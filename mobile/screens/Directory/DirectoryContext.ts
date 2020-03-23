import { createContext, useContext } from 'react';
import { DirectoryState, DirectoryInterpreter } from './DirectoryMachine';

const DirectoryContext = createContext(null);

export const useDirectory = () => {
  return useContext<[DirectoryState, DirectoryInterpreter['send']]>(DirectoryContext);
};

export const DirectoryProvider = DirectoryContext.Provider;
