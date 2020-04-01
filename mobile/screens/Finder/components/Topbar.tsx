import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'components/Icon';
import Typography from 'components/Typography';
import Logo from 'components/Logo';
import Button from 'components/Button';
import { useFinder } from '../FinderContext';
import AddItem from './Add';

const TobBarStyle = StyleSheet.create({
  container: {
    height: 60,
    padding: 15,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const Back = ({ onPress, label }) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Icon name="arrow-left" size={20} />
    <Text style={Typography.caption2}>{label}</Text>
  </TouchableOpacity>
);

const TopBar = () => {
  const [state, send] = useFinder();
  return (
    <View style={TobBarStyle.container}>
      {state.matches('editing') ? (
        <Button style={{ padding: 0 }} onPress={() => send('cancel')}>
          Cancelar
        </Button>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 60 }}>
          <Icon name="edit" onPress={() => send('edit')} size={20} />
          <Icon name="plus" onPress={() => send('add')} size={20} />
        </View>
      )}
      {state.context.parent && <Back onPress={() => send('back')} label={state.context.parent} />}
    </View>
  );
};

export default TopBar;
