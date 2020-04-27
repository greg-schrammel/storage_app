import * as React from 'react';
import { useState, useEffect } from 'react';
import { Keyboard, SafeAreaView, View, Text } from 'react-native';

import { statusBarHeight } from 'expo-constants';

import AddItem from 'screens/Finder/components/Add';
import List from 'screens/Finder/components/List';

import Input from 'components/Input';
import Icon from 'components/Icon';
import BluryOverlay from 'screens/Finder/modals/Adding/node_modules/components/BluryOverlay';
import Box from 'components/Box';
import Typography from 'components/Typography';
import Logo from 'components/Logo';

const Search = ({ style, onSearch }) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [search, setSearchValue] = useState('');
  React.useEffect(() => {
    if (search !== '') onSearch(search);
  }, [search]);
  // useKeyboardDismiss(() => setSearchOpen(false));
  return !isSearchOpen ? (
    <Icon onPress={() => setSearchOpen(true)} name="search" size={20} />
  ) : (
    <BluryOverlay onPressOut={() => setSearchOpen(false)}>
      <SafeAreaView style={{ flex: 1 }}>
        <Box
          style={{
            marginHorizontal: 15,
            marginTop: statusBarHeight,
            paddingVertical: 15,
            height: '60%',
          }}
        >
          <Input
            icon="search"
            onBlur={() => setSearchOpen(false)}
            placeholder="Busca"
            returnKeyType="search"
            clearButtonMode="while-editing"
            value={search}
            onChangeText={setSearchValue}
            style={{ marginHorizontal: 15 }}
          />
          <Text style={[Typography.subheader, { padding: 20, paddingBottom: 5 }]}>
            Resultado da busca:
          </Text>
          <List items={data} style={{ paddingHorizontal: 20 }} />
        </Box>
      </SafeAreaView>
    </BluryOverlay>
  );
};
