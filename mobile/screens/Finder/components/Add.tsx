import * as React from 'react';
import { useState, useReducer, useCallback } from 'react';
import { Keyboard, View, Text, CameraRoll } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import Icon from 'components/Icon';
import Popup from 'components/Popup';
import Input from 'components/Input';
import Box from 'components/Box';
import BluryOverlay from 'components/BluryOverlay';
import Button from 'components/Button';
import MenuItem from 'components/MenuItem';
import Typography from 'components/Typography';

// function useCameraRoll({ first = 40, assetType = 'Photos' as const, groupTypes = 'All' as const }) {
//   const [photos, setPhotos] = useState([]);
//   const [after, setAfter] = useState(null);
//   const [hasNextPage, setHasNextPage] = useState(true);

//   const getPhotos = useCallback(async () => {
//     if (!hasNextPage) return;
//     const { assets, endCursor, hasNextPage, totalCount } = await MediaLibrary.getAssetsAsync({
//       first,
//       ...(after && { after }),
//     });
//     if (after === pageInfo.end_cursor) return;
//     setPhotos([...photos, ...assets]);
//     setAfter(endCursor);
//     setHasNextPage(hasNextPage);
//   }, [after, hasNextPage, photos]);

//   return [photos, getPhotos];
// }

export const AddFolder = ({ onCancel, onConfirm }) => {
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
          <Button onPress={onCancel} color="dodgerblue">
            Cancelar
          </Button>
          <Button
            onPress={() => onConfirm({ type: 'folder', name })}
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

const AddItem = ({ onAddMedia, onAddFolder }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Popup
      isOpen={isOpen}
      onPressOutside={() => setOpen(false)}
      animationType="fade"
      blurIntensity={75}
      left
      trigger={<Icon name="plus" onPress={() => setOpen(true)} size={20} />}
      openTrigger={<Icon name="plus" size={20} />}
    >
      <MenuItem onPress={onAddMedia} label="Adicionar da Galeria" icon="photo" iconSize={24} />
      <MenuItem onPress={onAddFolder} label="Nova Pasta" icon="folder-o" iconSize={24} />
    </Popup>
  );
};

export default AddItem;
