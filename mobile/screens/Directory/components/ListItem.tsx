import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import Icon from 'components/Icon';
import Popup from 'components/Popup';
import MenuItem from 'components/MenuItem';
import Typography from 'components/Typography';
import { useDirectory } from '../useDirectory';

export type ItemTypes = 'folder' | 'audio' | 'photo' | 'video' | 'file' | 'zip';

export type uid = string;

export interface Item {
  id: uid;
  name: string;
  type: ItemTypes;
  contents: Array<uid | null> | BinaryType;
  meta: ItemMeta;
}

interface ItemMeta {
  creationTime: number;
  itemsCount?: number;
}

interface ListItemProps {
  item: Item;
  style: StyleProp<ViewStyle>;
}

const ListItemPreview = {
  // later maybe pre display photos etc
  folder: style => <Icon name="folder" size={36} color="deepskyblue" style={style} />,
  audio: style => <Icon name="file-audio-o" size={36} color="grey" style={style} />,
  photo: style => <Icon name="file-photo-o" size={36} color="grey" style={style} />,
  video: style => <Icon name="file-video-o" size={36} color="grey" style={style} />,
  file: style => <Icon name="file-o" size={36} color="grey" style={style} />,
  zip: style => <Icon name="file-zip-o" size={36} color="grey" style={style} />,
};

export type ItemAction = 'copy' | 'share' | 'move' | 'rename' | 'delete' | 'addToFavorites';
export type BulkAction = 'move' | 'delete';

const Options = ({ onSelect }: { onSelect: (e: ItemAction) => void }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Popup
      isOpen={isOpen}
      onPressOutside={() => setOpen(false)}
      blurIntensity={0}
      left
      reposition
      trigger={<Icon name="ellipsis-v" onPress={() => setOpen(true)} size={17} color="silver" />}
      openTrigger={<Icon name="ellipsis-v" size={17} color="silver" />}
    >
      <MenuItem icon="i-cursor" label="Renomear" onPress={() => onSelect('rename')} />
      <MenuItem
        icon="star-o"
        label="Adicionar aos Favoritos"
        onPress={() => onSelect('addToFavorites')}
      />
      <MenuItem icon="copy" label="Mover" onPress={() => onSelect('copy')} />
      <MenuItem icon="share-square-o" label="Compartilhar" onPress={() => onSelect('share')} />
      <MenuItem icon="trash-o" label="Excluir" onPress={() => onSelect('delete')} />
    </Popup>
  );
};

const SelectBadge = ({ isSelected }) => (
  <View
    style={{
      borderWidth: 2,
      borderColor: isSelected ? 'dodgerblue' : 'lightgrey',
      borderRadius: 5,
      width: 15,
      height: 15,
      position: 'absolute',
      left: 15,
      bottom: 15,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {isSelected && <Icon name="check" color="dodgerblue" size={9} />}
  </View>
);

export const ITEM_HEIGHT = 60;

const Item = ({ item: { id, name, type, meta }, style }: ListItemProps) => {
  const [state, send] = useDirectory();
  const isSelecting = state.matches('selecting');
  const Preview = ListItemPreview[type] || ListItemPreview.file;
  return (
    <TouchableOpacity
      activeOpacity={isSelecting ? 1 : 0.2}
      onPress={() => send({ type: 'open', item: id })}
      style={[{ height: ITEM_HEIGHT, alignItems: 'center', flexDirection: 'row' }, style]}
    >
      <Preview />
      {isSelecting && <SelectBadge isSelected={state.context.selected.includes(id)} />}
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={[Typography.subheader, { marginBottom: 2 }]}>{name}</Text>
        <Text style={[Typography.caption, { color: 'silver' }]}>
          {/* type === 'folder' ? meta.itemsCount : */ `criado em ${new Date(
            meta.creationTime,
          ).toLocaleDateString()}`}
        </Text>
      </View>
      <Options onSelect={action => send({ type: action, item: id })} />
    </TouchableOpacity>
  );
};

export default Item;
