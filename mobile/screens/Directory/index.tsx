import * as React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { useMachine } from '@xstate/react';
import Constants from 'expo-constants';

import Icon from 'components/Icon';

import Typography from 'components/Typography';
import Header from './components/Header';
import List from './components/List';
import AddItem from './components/Add';
import TopBar from './components/Topbar';
import directoryMachine from './DirectoryMachine';
import { DirectoryProvider } from './DirectoryContext';

function DirectoryScreen(): React.ReactElement {
  const [state, send] = useMachine(directoryMachine, {
    context: { folder: null, sortBy: 'name' },
  });
  return (
    <DirectoryProvider value={[state, send]}>
      <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <TopBar onBack backLabel={null}>
            <AddItem />
          </TopBar>
          <Header />
          <List />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingTop: 10,
            borderTopColor: 'whitesmoke',
            borderTopWidth: 1,
          }}
        >
          <Tab icon="star" label="Favoritos" />
          <Tab icon="users" label="Compartilhados" />
          <Tab icon="folder" label="Arquivos" active />
          <Tab icon="user" label="Configurações" />
        </View>
      </SafeAreaView>
    </DirectoryProvider>
  );
}

const Tab = ({ icon, label, active = false, color = active ? 'dodgerblue' : 'darkgrey' }) => (
  <View style={{ alignItems: 'center' }}>
    <Icon name={icon} size={24} color={color} />
    <Text style={[Typography.caption, { color, fontSize: 10, padding: 5 }]}>{label}</Text>
  </View>
);

export default DirectoryScreen;
