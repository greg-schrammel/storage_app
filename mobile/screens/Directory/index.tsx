import * as React from 'react';
import { SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

import { useMachine } from '@xstate/react';
import Header from './components/Header';
import List from './components/List';
import AddItem, { AddFolder } from './components/Add';
import TopBar from './components/Topbar';
import DirectoryMachine from './DirectoryMachine';
import { DirectoryProvider } from './DirectoryContext';

function DirectoryScreen(): React.ReactElement {
  const [state, send, services] = useMachine(DirectoryMachine);
  return (
    <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <TopBar onBack backLabel={null}>
        <AddItem onAddFolder={() => send('addFolder')} onAddMedia={() => send('addMedia')} />
      </TopBar>
      <DirectoryProvider value={[state, send, services]}>
        <Header />
        <List />
        {state.matches('adding.folder') && (
          <AddFolder
            onConfirm={newFolder => send('add', newFolder)}
            onCancel={() => send('cancel')}
          />
        )}
        {/* {state.matches('adding.media') && <AddMedia />} */}
      </DirectoryProvider>
    </SafeAreaView>
  );
}

export default DirectoryScreen;
