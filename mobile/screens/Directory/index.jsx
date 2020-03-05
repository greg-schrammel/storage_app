import * as React from 'react';
import { useState, useEffect } from 'react';
import { Keyboard, SafeAreaView, View, Text } from 'react-native';

import { statusBarHeight } from 'expo-constants';

import AddItem from 'screens/Directory/components/AddItem';
import List from 'screens/Directory/components/List';
import Input from 'components/Input';
import Icon from 'components/Icon';
import BluryOverlay from 'components/BluryOverlay';
import Card from 'components/Card';
import Typography from 'components/Typography';

const Header = ({ style, onSearch }) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [search, setSearchValue] = useState('');
  React.useEffect(() => {
    if (search !== '') onSearch(search);
  }, [search]);
  // useKeyboardDismiss(() => setSearchOpen(false));
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
      {/* {!isSearchOpen ? ( */}
      <Icon onPress={() => setSearchOpen(true)} name="search" size={20} />
      {
        // ) : (
        //   <BluryOverlay onPressOut={() => setSearchOpen(false)}>
        //     <SafeAreaView style={{ flex: 1 }}>
        //       <Card
        //         style={{
        //           marginHorizontal: 15,
        //           marginTop: statusBarHeight,
        //           paddingVertical: 15,
        //           height: '60%',
        //         }}
        //       >
        //         <Input
        //           icon="search"
        //           onBlur={() => setSearchOpen(false)}
        //           placeholder="Busca"
        //           returnKeyType="search"
        //           clearButtonMode="while-editing"
        //           value={search}
        //           onChangeText={setSearchValue}
        //           style={{ marginHorizontal: 15 }}
        //         />
        //         <Text style={[Typography.subheader, { padding: 20, paddingBottom: 5 }]}>
        //           Resultado da busca:
        //         </Text>
        //         <List items={data} style={{ paddingHorizontal: 20 }} />
        //       </Card>
        //     </SafeAreaView>
        //   </BluryOverlay>
        // )}
      }
    </View>
  );
};

const ListHeader = ({ style }) => {
  return (
    <View style={style}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={Typography.header}>Meus Arquivos</Text>
        <AddItem />
      </View>
      <Text style={[Typography.caption2, { margin: 10, marginTop: 5 }]}>/ahskuh</Text>
    </View>
  );
};

const data = [
  { id: '12313', type: 'folder', info: '12 items', name: 'musica 1', contents: 1000101 },
  { id: '1231', type: 'folder', info: 'criado em 10/02/2020', name: 'pastaaaa', contents: 1000101 },
  { id: '12213123313', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '121223443', type: 'folder', name: 'pastaaaa', contents: 1000101 },
  { id: '12322213', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '1222323443', type: 'folder', name: 'pastaaaa', contents: 1000101 },
  { id: '123123333', type: 'folder', name: 'musica 1', contents: 1000101 },
];

export default function DirectoryScreen() {
  const [search, setSearchValue] = useState('');
  useEffect(() => {
    // change list items to
  }, [search]);
  return (
    <SafeAreaView style={{ flex: 1, marginTop: statusBarHeight }}>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Header style={{ paddingHorizontal: 20 }} />
        <ListHeader onSearch={setSearchValue} style={{ paddingHorizontal: 20 }} />
        <List items={data} style={{ paddingHorizontal: 20 }} />
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
      </View>
    </SafeAreaView>
  );
}
