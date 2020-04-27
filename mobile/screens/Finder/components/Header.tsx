import * as React from 'react';

import { View, Text, StyleSheet, Animated } from 'react-native';

import Typography from 'components/Typography';
import Input from 'components/Input';

import SortBy from './Sort';
import { useFinder } from '../FinderProvider';

const Styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
    paddingHorizontal: 20,
    borderColor: 'whitesmoke',
    borderBottomWidth: 1,
  },
});

const SEARCH_HEIGHT = 36;
const searchInputInterpolation = (listScrollY, outputRange) =>
  listScrollY.interpolate({
    inputRange: [0, 36, 150],
    outputRange,
    extrapolate: 'clamp',
  });

const Header = ({ listScrollY }: { listScrollY: Animated.Value }) => {
  const [state, send] = useFinder();
  return (
    <View style={Styles.container}>
      <Text style={[Typography.largeHeader]}>Meus Arquivos</Text>
      <Input
        disabled={state.matches('noFiles')}
        onFocus={() => send('search')}
        onChangeText={search => send({ type: 'searchChange', search })}
        placeholder="Pesquisar"
        icon="search"
        style={{
          height: searchInputInterpolation(listScrollY, [SEARCH_HEIGHT, SEARCH_HEIGHT, 0]),
          opacity: searchInputInterpolation(listScrollY, [1, 1, 0]),
          paddingVertical: searchInputInterpolation(listScrollY, [8, 8, 0]),
          marginVertical: searchInputInterpolation(listScrollY, [10, 10, 5]),
        }}
      />
      <SortBy
        disabled={state.matches('noFiles')}
        onPress={() => send('sorting')}
        by={state.context.sort.by}
        direction={state.context.sort.direction}
      />
    </View>
  );
};

export default Header;
