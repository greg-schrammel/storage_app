import * as React from 'react';
import { SafeAreaView, View } from 'react-native';

import Constants from 'expo-constants';

import Icon from 'components/Icon';
import Header from './components/Header';
import List from './components/List';
import AddItem from './components/Add';
import TopBar from './components/Topbar';
import { DirectoryProvider } from './useDirectory';

function DirectoryScreen(): React.ReactElement {
  return (
    <DirectoryProvider>
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
            paddingHorizontal: 40,
            padding: 15,
            borderTopColor: 'whitesmoke',
            borderTopWidth: 1,
          }}
        >
          <Icon name="star" size={24} color="darkgrey" />
          <Icon name="folder" size={24} color="dodgerblue" />
          <Icon name="user" size={24} color="darkgrey" />
        </View>
      </SafeAreaView>
    </DirectoryProvider>
  );
}

export default DirectoryScreen;
