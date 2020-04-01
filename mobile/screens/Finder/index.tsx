import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { useMachine } from '@xstate/react';

import Header from 'screens/Finder/components/Header';
import List from 'screens/Finder/components/List';
import TopBar from 'screens/Finder/components/Topbar';

import AddingModal from './Adding';
import FinderMachine from './FinderMachine';
import { FinderProvider } from './FinderContext';

function FinderScreen({ folderId }): React.ReactElement {
  const [state, send, service] = useMachine(FinderMachine, { context: { folder: folderId } });
  return (
    <FinderProvider value={[state, send, service]}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBar />
        <Header />
        <List />
      </SafeAreaView>
      {state.matches('adding') && <AddingModal />}
    </FinderProvider>
  );
}

export default FinderScreen;
