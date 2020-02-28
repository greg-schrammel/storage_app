import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import { statusBarHeight } from 'expo-constants';

import AddItem from 'screens/Directory/components/AddItem';
import List from 'screens/Directory/components/List';
import Input from 'components/Input';
import Icon from 'components/Icon';

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
        /Pasta1/PastaFilho2
      </Text>
    </View>
  );
};

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
      <Input
        icon="search"
        placeholder="Busca"
        returnKeyType="search"
        clearButtonMode="while-editing"
        value={search}
        onChangeText={onSearchValue}
        style={{ marginRight: 20 }}
      />
      <Icon name="user" size={24} color="lightgrey" />
    </View>
  );
};

export default function DirectoryScreen() {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: statusBarHeight }}>
      <Header style={{ paddingHorizontal: 20 }} />
      <ListHeader style={{ paddingHorizontal: 20, marginBottom: 5 }} />
      <List style={{ paddingHorizontal: 20 }} />
    </SafeAreaView>
  );
}
