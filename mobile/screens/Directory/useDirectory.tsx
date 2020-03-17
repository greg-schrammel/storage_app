import * as React from 'react';
import { createContext, useContext, ReactElement } from 'react';
import { useMachine } from '@xstate/react';

import directoryMachine, { FolderInterpreter, FolderState } from './DirectoryMachine';

const data = [
  { id: '12313', type: 'folder', info: '12 items', name: 'musica 1', contents: 1000101 },
  { id: '1231', type: 'folder', info: 'criado em 10/02/2020', name: 'pastaaaa', contents: 1000101 },
  { id: '12213123313', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '121223443', type: 'folder', name: 'pastaaaa', contents: 1000101 },
  { id: '12322213', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '1222323443', type: 'folder', name: 'pastaaaa', contents: 1000101 },
  { id: 'eqw', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '12wqe313', type: 'folder', info: '12 items', name: 'musica 1', contents: 1000101 },
  { id: '11', type: 'folder', info: 'criado em 10/02/2020', name: 'pastaaaa', contents: 1000101 },
  { id: '12231213123313', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '121412223443', type: 'folder', name: 'pastaaaa', contents: 1000101 },
  { id: '12324342213', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '122414422323443', type: 'folder', name: 'pastaaaa', contents: 1000101 },
  { id: '12312431113333', type: 'folder', name: 'musica 1', contents: 1000101 },
];

const DirectoryContext = createContext(null);

export const useDirectory = () => {
  return useContext<[FolderState, FolderInterpreter['send']]>(DirectoryContext);
};

export const DirectoryProvider = ({ children }): ReactElement => (
  <DirectoryContext.Provider value={useMachine(directoryMachine, { items: data, sortBy: 'name' })}>
    {children}
  </DirectoryContext.Provider>
);
