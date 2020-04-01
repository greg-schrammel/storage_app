import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useService } from '@xstate/react';

import Icon from 'components/Icon';
import Popup from 'components/Popup';
import MenuItem from 'components/MenuItem';
import Typography from 'components/Typography';

import { Interpreter } from 'xstate';
import { Item } from '@types/item';
<<<<<<< Updated upstream
import { ItemActor, ItemAction } from '../DirectoryMachine';

interface ListItemProps {
  itemActor: ItemActor;
  style: StyleProp<ViewStyle>;
  isSelected: boolean;
  isSelecting: boolean;
=======
import { FileActor, FileAction } from '../FileMachine';

interface ListItemProps {
  actor: FileActor;
  style: StyleProp<ViewStyle>;
  showSelector: boolean;
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
const Options = ({ onSelect }: { onSelect: (e: ItemAction) => void }) => {
=======
const Options = ({ onSelect }: { onSelect: (e: FileAction) => void }) => {
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
const ListItem = ({ itemActor, isSelecting, isSelected, style }: ListItemProps) => {
  const [state, send] = useService(itemActor as Interpreter<Item>);
=======
const FileListItem = ({ actor, showSelector, style }: ListItemProps) => {
  const [state, send] = useService(actor as Interpreter<Item>);
>>>>>>> Stashed changes
  const { name, type, meta } = state.context;

  const Preview = ListItemPreview[type] || ListItemPreview.file;
  return (
    <TouchableOpacity
<<<<<<< Updated upstream
      activeOpacity={isSelecting ? 1 : 0.2}
      onPress={() => send('press')}
      style={[{ height: ITEM_HEIGHT, alignItems: 'center', flexDirection: 'row' }, style]}
    >
      <Preview />
      {isSelecting && <SelectBadge isSelected={isSelected} />}
=======
      activeOpacity={showSelector ? 1 : 0.2}
      onPress={() => (showSelector ? send('select') : send('open'))}
      style={[{ height: ITEM_HEIGHT, alignItems: 'center', flexDirection: 'row' }, style]}
    >
      <Preview />
      {showSelector && <SelectBadge isSelected={state.matches('selected')} />}
>>>>>>> Stashed changes
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={[Typography.subheader, { marginBottom: 2 }]}>{name}</Text>
        <Text style={[Typography.caption, { color: 'silver' }]}>
          {type === 'folder'
            ? `${meta.itemsCount || 0} items`
            : `criado em ${new Date(meta.creationTime).toLocaleDateString()}`}
        </Text>
      </View>
      <Options onSelect={action => send(action)} />
    </TouchableOpacity>
  );
};

<<<<<<< Updated upstream
export default ListItem;
=======
export default FileListItem;
>>>>>>> Stashed changes
