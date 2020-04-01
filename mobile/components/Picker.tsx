import * as React from 'react';
import { View, Text } from 'react-native';

import BluryOverlay from 'components/BluryOverlay';
import Typography from './Typography';
import Button from './Button';

const Picker = ({ children, title, onDismiss }) => {
  return (
    <BluryOverlay
      intensity={75}
      onPress={onDismiss}
      animationType="slide"
      style={{ flexDirection: 'column-reverse' }}
    >
      <View
        style={{
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          backgroundColor: 'white',
          paddingTop: 5,
          paddingBottom: 40,
        }}
      >
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'whitesmoke', marginBottom: 5 }}>
          <Text style={[Typography.header, { width: '100%', padding: 10, textAlign: 'center' }]}>
            {title}
          </Text>
        </View>
        {/* <View
            style={{
              backgroundColor: 'lightgrey',
              width: 30,
              borderRadius: 20,
              height: 5,
              margin: 10,
            }}
          /> */}
        {children}
        <Button
          onPress={onDismiss}
          backgroundColor="whitesmoke"
          style={{
            borderRadius: 30,
            marginHorizontal: 20,
            marginTop: 10,
            paddingVertical: 15,
          }}
        >
          Cancelar
        </Button>
      </View>
    </BluryOverlay>
  );
};

export default Picker;
