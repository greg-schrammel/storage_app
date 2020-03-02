import * as React from 'react';
import { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Icon from 'components/Icon';
import Popup from 'components/Popup';
import MenuItem from 'components/MenuItem';

interface ItemProps {
  name: string;
  info: string;
  id: string;
  type: 'folder' | 'music';
  onPress: () => void;
}

const Styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'silver',
  },
});

// map item type to icon name

const Item = ({ name, info, id, type }: ItemProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <TouchableOpacity style={Styles.container}>
      <Icon name={type} size={36} style={{ marginRight: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={[Styles.nameLabel, { marginBottom: 2 }]}>{name}</Text>
        <Text style={Styles.infoLabel}>{info}</Text>
      </View>
      <Popup
        isOpen={isOpen}
        onPressOut={() => setOpen(false)}
        blurIntensity={0}
        left
        trigger={<Icon name="ellipsis-v" onPress={() => setOpen(true)} size={17} color="silver" />}
        openTrigger={<Icon name="ellipsis-v" size={17} color="silver" />}
      >
        <MenuItem icon="i-cursor" label="Renomear" onPressOut={() => null} />
        <MenuItem icon="star-o" label="Adicionar aos Favoritos" onPressOut={() => null} />
        <MenuItem icon="copy" label="Mover" onPressOut={() => null} />
        <MenuItem icon="share-square-o" label="Compartilhar" onPressOut={() => null} />
        <MenuItem icon="trash-o" label="Excluir" onPressOut={() => null} />
      </Popup>
    </TouchableOpacity>
  );
};

const data = [
  { id: '12313', type: 'folder', info: '12 items', name: 'musica 1', contents: 1000101 },
  { id: '1231', type: 'mp3', info: 'criado em 10/02/2020', name: 'pastaaaa', contents: 1000101 },
  { id: '12213123313', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '121223443', type: 'folder', name: 'pastaaaa', contents: 1000101 },
  { id: '12322213', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '1222323443', type: 'folder', name: 'pastaaaa', contents: 1000101 },
  { id: '123123333', type: 'folder', name: 'musica 1', contents: 1000101 },
];

const renderItem = ({ item }) => (
  <Item type={item.type} id={item.id} name={item.name} info="12 items" onPress={() => null} />
);

// key={grid ? 'grid' : 'list'}
// numColumns={grid ? 2 : 1}
// columnWrapperStyle

// ListEmptyComponent

const List = props => (
  <View style={{ backgroundColor: '#fff', flex: 1 }}>
    <FlatList data={data} keyExtractor={item => item.id} renderItem={renderItem} {...props} />
    {/* <LinearGradient
      style={{ position: 'absolute', bottom: 0, width: '100%', height: 30 }}
      colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 1)']}
      pointerEvents="none"
    /> */}
  </View>
);

export default List;
