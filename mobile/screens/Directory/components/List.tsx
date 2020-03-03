import * as React from 'react';
import { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatListProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Icon from 'components/Icon';
import Popup from 'components/Popup';
import MenuItem from 'components/MenuItem';
import Typography from 'components/Typography';

interface ItemProps {
  item: ListItem;
  onPress: () => void;
}

const Styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

// map item type to icon name

const Item = ({ item: { name, info, id, type }, onPress }: ItemProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <TouchableOpacity style={Styles.container}>
      <Icon name={type} size={36} style={{ marginRight: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={[Typography.subheader, { marginBottom: 2 }]}>{name}</Text>
        <Text style={Typography.caption}>{info}</Text>
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

// key={grid ? 'grid' : 'list'}
// numColumns={grid ? 2 : 1}
// columnWrapperStyle

// ListEmptyComponent

interface ListItem {
  id: string;
  info: string;
  name: string;
  type: 'folder' | 'pdf' | 'jpg' | 'png' | ''; //
  contents?: BinaryType;
}

interface ListProps {
  items: Array<ListItem>;
  style: StyleProp<ViewStyle>;
  onPressItem: (itemId: string) => void;
}

const List = ({ items, style, onPressItem }: ListProps) => (
  <View style={{ backgroundColor: '#fff', flex: 1 }}>
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Item item={item} onPress={() => onPressItem(item.id)} />}
      style={style}
    />
    {/* <LinearGradient
      style={{ position: 'absolute', bottom: 0, width: '100%', height: 30 }}
      colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 1)']}
      pointerEvents="none"
    /> */}
  </View>
);

export default List;
