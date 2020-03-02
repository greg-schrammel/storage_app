import * as React from 'react';
import { useState } from 'react';
import { Keyboard, View, Text, TouchableOpacity } from 'react-native';

import Icon from 'components/Icon';
import Popup from 'components/Popup';
import Input from 'components/Input';
import Card from 'components/Card';
import BluryOverlay from 'components/BluryOverlay';
import Button from 'components/Button';
import MenuItem from 'components/MenuItem';

const AddFolder = ({ onCancel }) => {
  return (
    <BluryOverlay
      onPressOut={Keyboard.dismiss}
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Card style={{ width: '90%', height: '60%' }}>
        <Text
          style={{
            marginTop: 20,
            fontWeight: '800',
            fontSize: 20,
            width: '100%',
            textAlign: 'center',
          }}
        >
          Nova Pasta
        </Text>
        <Input label="Nome:" style={{ margin: 20 }} />
        <View style={{ flex: 1 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button onPress={onCancel} color="dodgerblue">
            Cancelar
          </Button>
          <Button onPress={() => null} color="white" backgroundColor="dodgerblue">
            Adicionar
          </Button>
        </View>
      </Card>
    </BluryOverlay>
  );
};

const AddItemButton = ({ onAdd }) => {
  const [isOpen, setOpen] = useState(false);
  const [isAdding, setAdding] = useState(false);
  return (
    <Popup
      isOpen={isOpen}
      onPressOut={() => setOpen(false)}
      animationType="fade"
      trigger={<Icon name="plus" onPress={() => setOpen(true)} size={24} />}
      openTrigger={<Icon name="plus" size={24} />}
    >
      <MenuItem
        onPressOut={() => setAdding(true)}
        label="Adicionar da Galeria"
        icon="photo"
        iconSize={24}
      />
      <MenuItem
        onPressOut={() => setAdding(true)}
        label="Nova Pasta"
        icon="folder-o"
        iconSize={24}
      />
      {isAdding && <AddFolder onCancel={() => setAdding(false)} />}
    </Popup>
  );
};

export default AddItemButton;
