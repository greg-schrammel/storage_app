import * as React from 'react';
import { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';

import { uniqueId } from 'xstate/lib/utils';
import directoryMachine, { FolderInterpreter, FolderState } from './DirectoryMachine';
import { Item } from './components/ListItem';

const createFolder = (): Item => ({
  id: uniqueId(),
  type: 'folder',
  meta: {
    creationTime: Date.now(),
  },
  name: `pasta ${uniqueId()}`,
  contents: [],
});

const data = [...Array(20)].map(createFolder);

const DirectoryContext = createContext(null);

export const useDirectory = () => {
  return useContext<[FolderState, FolderInterpreter['send']]>(DirectoryContext);
};

export const DirectoryProvider = ({ children }): ReactElement => {
  const [state, send] = useMachine(directoryMachine, {
    context: { items: data, parent: null, sortBy: 'name' },
  });
  return <DirectoryContext.Provider value={[state, send]}>{children}</DirectoryContext.Provider>;
};
