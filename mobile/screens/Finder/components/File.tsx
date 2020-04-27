import * as React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useService } from '@xstate/react';

import Icon from 'components/Icon';
import MenuItem from 'components/MenuItem';
import Typography from 'components/Typography';

import { Interpreter } from 'xstate';
import { Item } from '@types/item';
import { FileActor, FileAction } from '../FileMachine';
import Picker from 'components/Picker';
import { useFinder } from '../FinderProvider';

interface ListItemProps {
  actor: FileActor;
  style: StyleProp<ViewStyle>;
  showSelector: boolean;
}

const ListItemPreview = {
  // later maybe pre display photos etc
  folder: style => <Icon name="folder" size={32} color="deepskyblue" style={style} />,
  audio: style => <Icon name="file-audio-o" size={32} color="grey" style={style} />,
  photo: style => <Icon name="file-photo-o" size={32} color="grey" style={style} />,
  video: style => <Icon name="file-video-o" size={32} color="grey" style={style} />,
  file: style => <Icon name="file-o" size={32} color="grey" style={style} />,
  zip: style => <Icon name="file-zip-o" size={32} color="grey" style={style} />,
};

const Preview = ({ type }) => {
  const PreviewComponent = ListItemPreview[type] || ListItemPreview.file;
  return <PreviewComponent />;
};

const EditingFilePreview = ({ type, name, meta }) => (
  <View style={{ margin: 15, borderRadius: 10, backgroundColor: 'white', padding: 5 }}>
    <Preview type={type} />
    <Info type={type} name={name} meta={meta} />
  </View>
);

export const EditingFile = () => {
  const [state, send] = useFinder();
  const [fileState, sendFile] = useService(state.children.editingFile);
  const { type, name, meta } = fileState.context;
  return (
    <Picker
      title="Editar"
      onDismiss={() => send('cancel')}
      above={<EditingFilePreview type={type} name={name} meta={meta} />}
    >
      <MenuItem icon="i-cursor" label="Renomear" onPress={() => sendFile('rename')} />
      <MenuItem
        icon="star-o"
        label="Adicionar aos Favoritos"
        onPress={() => sendFile('addToFavorites')}
      />
      <MenuItem icon="copy" label="Mover" onPress={() => sendFile('copy')} />
      <MenuItem icon="share-square-o" label="Compartilhar" onPress={() => sendFile('share')} />
      <MenuItem icon="trash-o" label="Excluir" onPress={() => sendFile('delete')} />
    </Picker>
  );
};

const Styles = StyleSheet.create({
  checkbox: {
    borderWidth: 2,
    borderRadius: 4,
    width: 20,
    height: 20,
    marginRight: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Checkbox = ({ isSelected }) => (
  <View
    style={[
      Styles.checkbox,
      {
        borderColor: isSelected ? 'dodgerblue' : 'lightgrey',
        backgroundColor: isSelected ? 'dodgerblue' : 'white',
      },
    ]}
  >
    {isSelected && <Icon name="check" color="white" size={15} />}
  </View>
);

const Info = ({ type, meta, name }) => (
  <View style={{ flex: 1, marginLeft: 15 }}>
    <Text style={[Typography.subheader, { marginBottom: 5 }]}>{name}</Text>
    <Text style={[Typography.caption, { color: 'silver' }]}>
      {type === 'folder'
        ? `${meta.itemsCount || 0} items`
        : `criado em ${new Date(meta.creationTime).toLocaleDateString()}`}
    </Text>
  </View>
);

export const LIST_FILE_HEIGHT = 60;

export const ListFile = ({ actor, style }: ListItemProps) => {
  const [state, send] = useService(actor as Interpreter<Item>);
  const { id, name, type, meta } = state.context;
  const isSelecting = state.matches('listing.selecting');
  return (
    <TouchableOpacity
      activeOpacity={isSelecting ? 1 : 0.2}
      onPress={() => (isSelecting ? send('select') : send('open'))}
      style={[{ height: LIST_FILE_HEIGHT, alignItems: 'center', flexDirection: 'row' }, style]}
    >
      {isSelecting && <Checkbox isSelected={state.matches('listing.selecting.selected')} />}
      <Preview type={type} />
      <Info type={type} name={name} meta={meta} />
    </TouchableOpacity>
  );
};

export default ListFile;
