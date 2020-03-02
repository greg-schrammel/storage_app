import * as React from 'react';
import { useState } from 'react';
import { Keyboard, SafeAreaView, View, Text } from 'react-native';

import { statusBarHeight } from 'expo-constants';

import AddItem from 'screens/Directory/components/AddItem';
import List from 'screens/Directory/components/List';
import Input from 'components/Input';
import Icon from 'components/Icon';
import Logo from 'components/Logo';

const Header = ({ style }) => {
  const [search, onSearchValue] = useState('');
  return (
    <View
      style={{
        height: 80,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }}
    >
      <Icon onPress={() => null} name="search" size={20} />
      {/* <Input
        icon="search"
        placeholder="Busca"
        returnKeyType="search"
        clearButtonMode="while-editing"
        value={search}
        onChangeText={onSearchValue}
        // style={{ marginRight: 20 }}
      /> */}
      {/* <Icon onPress={() => null} name="user" size={24} color="lightgrey" /> */}
    </View>
  );
};

const ListHeader = ({ style }) => {
  return (
    <View style={style}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 32, fontWeight: '800' }}>Meus Arquivos</Text>
        <AddItem />
      </View>
      <Text
        style={{
          fontSize: 16,
          color: 'silver',
          fontWeight: '600',
          margin: 10,
          marginTop: 5,
        }}
      >
        /ahskuh
      </Text>
    </View>
  );
};

export default function DirectoryScreen() {
  // const [search, setSearch] = useState('');
  return (
    <SafeAreaView style={{ flex: 1, marginTop: statusBarHeight }}>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Header style={{ paddingHorizontal: 20 }} />
        <ListHeader style={{ paddingHorizontal: 20 }} />
        <List style={{ paddingHorizontal: 20 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginHorizontal: 50,
          padding: 10,
        }}
      >
        <Icon name="star" size={24} color="lightgrey" />
        <Icon name="folder" size={24} color="dodgerblue" />
        <Icon name="user" size={24} color="lightgrey" />
        <Icon name="user" size={24} color="lightgrey" />
      </View>
    </SafeAreaView>
  );
}
