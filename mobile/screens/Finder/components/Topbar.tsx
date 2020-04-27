import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'components/Icon';
import Typography from 'components/Typography';
import Button from 'components/Button';
import { useFinder } from '../FinderProvider';

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
      {state.matches('listing.editing') ? (
        <Button style={{ padding: 5 }} onPress={() => send('cancel')}>
          Cancelar
        </Button>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            style={{
              padding: 5,
              paddingHorizontal: 10,
              backgroundColor: 'whitesmoke',
              borderRadius: 20,
              marginRight: 10,
            }}
            onPress={() => send('editing')}
          >
            Selectionar
          </Button>
          <Icon
            name="plus"
            onPress={() => send('adding')}
            size={20}
            style={{
              backgroundColor: 'whitesmoke',
              borderRadius: '100%',
              height: 30,
              width: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </View>
      )}
      {state.context.parent && <Back onPress={() => send('back')} label={state.context.parent} />}
    </View>
  );
};

export default TopBar;
