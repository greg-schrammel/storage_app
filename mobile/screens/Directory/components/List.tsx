import * as React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Icon from 'components/Icon';
import Typography from 'components/Typography';

import Item, { ITEM_HEIGHT } from './ListItem';
import { useDirectory } from '../useDirectory';

const BulkActionsContainer = ({ children }) => (
  <View
    style={{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 40,
      backgroundColor: 'dodgerblue',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    }}
  >
    {children}
  </View>
);

const ListEmptyItemStyle = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'whitesmoke',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
});

const ListEmptyComponent = () => [
  <Text style={[Typography.caption2, { textAlign: 'center', margin: 20, marginBottom: 10 }]}>
    Esta vazio por aqui, adicione alguma coisa
  </Text>,
  <TouchableOpacity style={ListEmptyItemStyle.container}>
    <Text style={Typography.subheader}>Crie uma pasta</Text>
    <Icon name="folder" size={20} />
  </TouchableOpacity>,
  <TouchableOpacity style={ListEmptyItemStyle.container}>
    <Text style={[Typography.subheader]}>Salve da sua galeria</Text>
    <Icon name="photo" size={20} />
  </TouchableOpacity>,
];

// key={grid ? 'grid' : 'list'}
// numColumns={grid ? 2 : 1}
// columnWrapperStyle

// ListEmptyComponent
const List = () => {
  const [state, send] = useDirectory();
  const { items, selected } = state.context;
  const isSelecting = state.value === 'selecting';
  return (
    <View style={{ backgroundColor: '#fff', flex: 1, width: '100%' }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        data={items}
        keyExtractor={item => item.id}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={({ item }) => <Item item={item} style={{ paddingHorizontal: 20 }} />}
        getItemLayout={(_data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
      {isSelecting && !!selected.length ? (
        <BulkActionsContainer>
          <Text style={[Typography.caption2, { color: 'white' }]}>Mover Todos</Text>
          <Icon
            name="trash"
            color="white"
            size={20}
            onPress={() => send({ type: 'delete', id: selected })}
          />
        </BulkActionsContainer>
      ) : (
        <LinearGradient
          style={{ position: 'absolute', bottom: 0, width: '100%', height: 30 }}
          colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 1)']}
          pointerEvents="none"
        />
      )}
    </View>
  );
};

export default List;
