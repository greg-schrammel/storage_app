import * as React from 'react';
import { useState } from 'react';
import { Keyboard, View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import Input from 'components/Input';
import Button from 'components/Button';
import Typography from 'components/Typography';
import { useFinder } from 'screens/Finder/FinderProvider';

const Styles = StyleSheet.create({
  container: {
    width: '90%',
    top: '25%',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

export const AddFolder = () => {
  const [, send] = useFinder();
  const [name, setName] = useState('');
  return (
    <Modal isVisible onBackdropPress={Keyboard.dismiss}>
      <View style={Styles.container}>
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
            onPress={() => send('add', { file: { type: 'folder', name } })}
            backgroundColor="dodgerblue"
            color="white"
          >
            Adicionar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default AddFolder;
