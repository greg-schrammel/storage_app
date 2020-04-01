import * as React from 'react';
import { useState } from 'react';
import { Keyboard, View, Text } from 'react-native';

import Input from 'components/Input';
import Box from 'components/Box';
import BluryOverlay from 'components/BluryOverlay';
import Button from 'components/Button';
import Typography from 'components/Typography';
import { useFinder } from 'screens/Finder/FinderContext';

const AddFolder = () => {
  const [, send] = useFinder();
  const [name, setName] = useState('');
  return (
    <BluryOverlay
      intensity={75}
      animationType="slide"
      onPress={Keyboard.dismiss}
      style={{ alignItems: 'center' }}
    >
      <Box style={{ width: '90%', top: '25%' }}>
        <Text style={[Typography.header, { marginTop: 20, width: '100%', textAlign: 'center' }]}>
          Nova Pasta
        </Text>
        <Input
          label="Nome:"
          onChangeText={text => setName(text)}
          style={{ margin: 20, marginBottom: 0 }}
          autoFocus
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: 20,
          }}
        >
          <Button onPress={() => send('cancel')} color="dodgerblue">
            Cancelar
          </Button>
          <Button
            onPress={() => send('add', { item: { type: 'folder', name } })}
            backgroundColor="dodgerblue"
            color="white"
          >
            Adicionar
          </Button>
        </View>
      </Box>
    </BluryOverlay>
  );
};

export default AddFolder;
