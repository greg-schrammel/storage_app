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
import { ItemTypes } from './ListItem';

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

const AddFolder = ({ onCancel, onConfirm }) => {
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
          <Button onPress={() => onConfirm({ name })} backgroundColor="dodgerblue" color="white">
            Adicionar
          </Button>
        </View>
      </Box>
    </BluryOverlay>
  );
};

const reducer = (state, action) =>
  ({
    add: () => ({
      state: 'adding',
      what: action.what,
    }),
    cancel: () => ({
      state: 'closed',
    }),
    open: () => ({
      state: 'open',
    }),
  }[action.type]());

type NewItem = { type: ItemTypes; name: string; contents?: string };

interface AddItemProps {
  onAdd: (item: NewItem) => void;
}

const AddItem = ({ onAdd }: AddItemProps) => {
  const [{ state, what }, send] = useReducer(reducer, { state: 'closed' });
  return (
    <>
      <Popup
        isOpen={state === 'open'}
        onPressOutside={() => send({ type: 'cancel' })}
        animationType="fade"
        blurIntensity={75}
        left
        trigger={<Icon name="plus" onPress={() => send({ type: 'open' })} size={20} />}
        openTrigger={<Icon name="plus" size={20} />}
      >
        <MenuItem
          onPress={() => send({ type: 'add', what: 'photo' })}
          label="Adicionar da Galeria"
          icon="photo"
          iconSize={24}
        />
        <MenuItem
          onPress={() => send({ type: 'add', what: 'folder' })}
          label="Nova Pasta"
          icon="folder-o"
          iconSize={24}
        />
      </Popup>
      {what === 'folder' && (
        <AddFolder
          onConfirm={opts => onAdd({ type: what, ...opts })}
          onCancel={() => send({ type: 'cancel' })}
        />
      )}
      {/* {what === 'from-camera-roll' && <AddFromCameraRoll />} */}
    </>
  );
};

export default AddItem;
