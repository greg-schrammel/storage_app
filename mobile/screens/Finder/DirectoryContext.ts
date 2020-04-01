import { createContext, useContext } from 'react';
import { useService } from '@xstate/react';
import { DirectoryState, DirectoryInterpreter, BulkInterpreter } from './DirectoryMachine';

const DirectoryContext = createContext(null);

export const useDirectory = () => {
  return useContext<[DirectoryState, DirectoryInterpreter['send'], DirectoryInterpreter]>(
    DirectoryContext,
  );
};

export const useBulkService = (
  services: DirectoryInterpreter,
): [Array<string>, BulkInterpreter['send']] => {
  const [state, send] = useService(services.children.get('bulk') as BulkInterpreter);
  return [state.context.selected, send];
};

export const DirectoryProvider = DirectoryContext.Provider;
