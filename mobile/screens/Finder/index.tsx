import * as React from 'react';
import { SafeAreaView, Animated } from 'react-native';
import { useMachine } from '@xstate/react';

import Header from 'screens/Finder/components/Header';
import List from 'screens/Finder/components/List';
import TopBar from 'screens/Finder/components/Topbar';

import { FinderProvider } from './FinderProvider';
import FinderMachine from './FinderMachine';

import AddingModal from './screens/Adding';
import SortingModal from './screens/Sorting';
import EditingScreen from './screens/Editing';

function FinderScreen({ folderId }): React.ReactElement {
  const [state, send, service] = useMachine(FinderMachine, { context: { folder: folderId } });
  const listScrollY = React.useRef(new Animated.Value(0)).current;
  console.log(state.value);
  return (
    <FinderProvider value={[state, send, service]}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBar />
        <Header listScrollY={listScrollY} />
        <List onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: listScrollY } } }])} />
      </SafeAreaView>
      {state.matches('adding') && <AddingModal />}
      {state.matches('listing.sorting') && <SortingModal />}
      {state.matches('listing.editing') && <EditingScreen />}
    </FinderProvider>
  );
}

export default FinderScreen;
