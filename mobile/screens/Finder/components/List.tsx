import * as React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'components/Icon';
import Typography from 'components/Typography';

import Button from 'components/Button';
import { useFinder } from '../FinderContext';

import ListItem, { ITEM_HEIGHT } from './File';

const EditActionsContainer = ({ children }) => (
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

const ListEmptyComponent = ({ onAddFolder, onAddMedia }) => (
  <>
    <Text style={[Typography.caption2, { textAlign: 'center', margin: 20, marginBottom: 10 }]}>
      Esta vazio por aqui, adicione alguma coisa
    </Text>
    <TouchableOpacity onPress={onAddMedia} style={ListEmptyItemStyle.container}>
      <Text style={[Typography.subheader]}>Salve da galeria</Text>
      <Icon name="photo" size={20} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onAddFolder} style={ListEmptyItemStyle.container}>
      <Text style={Typography.subheader}>Crie uma pasta</Text>
      <Icon name="folder" size={20} />
    </TouchableOpacity>
  </>
);

// key={grid ? 'grid' : 'list'}
// numColumns={grid ? 2 : 1}
// columnWrapperStyle

// try {
//   const [editingState] = useService(state.children.edit as EditInterpreter);
//   selected = editingState.context.selected;
// } catch {
//   // if its not in editing state, the edit service doesnt exist and useService throws
//   // it will probably be fixed I a next release of @xstate/react so gonna let it this way until
// }

const List = () => {
  const [state, send] = useFinder();
  const isEditing = state.matches('editing');
  return (
    <View style={{ backgroundColor: '#fff', flex: 1, width: '100%' }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 5 }}
        data={state.context.data}
        keyExtractor={item => item.id}
        ListEmptyComponent={() =>
          state.matches('loading') ? null : (
            <ListEmptyComponent
              onAddFolder={() => send('addFolder')}
              onAddMedia={() => send('addMedia')}
            />
          )
        }
        renderItem={({ item }) => (
          <ListItem
            showSelector={isEditing}
            itemActor={item.ref}
            style={{ paddingHorizontal: 20 }}
          />
        )}
        getItemLayout={(_data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
      {isEditing && (
        <EditActionsContainer>
          <Button color="white" onPress={() => send('move')}>
            Mover Todos
          </Button>
          <Icon name="trash" color="white" size={20} onPress={() => send('delete')} />
        </EditActionsContainer>
      )}
    </View>
  );
};

export default List;
