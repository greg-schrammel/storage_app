import * as React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'components/Icon';
import Typography from 'components/Typography';

import Button from 'components/Button';
import { useFinder } from '../FinderProvider';

import ListFile, { LIST_FILE_HEIGHT } from './File';

const Styles = StyleSheet.create({
  editingContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 40,
    backgroundColor: 'dodgerblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  listEmptyContainer: {
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
    <TouchableOpacity onPress={onAddMedia} style={Styles.listEmptyContainer}>
      <Text style={[Typography.subheader]}>Salve da galeria</Text>
      <Icon name="photo" size={20} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onAddFolder} style={Styles.listEmptyContainer}>
      <Text style={Typography.subheader}>Crie uma pasta</Text>
      <Icon name="folder" size={20} />
    </TouchableOpacity>
  </>
);

// key={grid ? 'grid' : 'list'}
// numColumns={grid ? 2 : 1}
// columnWrapperStyle

const List = ({ onScroll }) => {
  const [state, send] = useFinder();
  return (
    <View style={{ backgroundColor: '#fff', flex: 1, width: '100%' }}>
      <FlatList
        scrollEventThrottle={1}
        onScroll={onScroll}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 5 }}
        data={state.context.files}
        keyExtractor={file => file.id}
        ListEmptyComponent={() =>
          state.matches('loading') ? null : (
            <ListEmptyComponent
              onAddFolder={() => send('addFolder')}
              onAddMedia={() => send('addMedia')}
            />
          )
        }
        renderItem={({ item: file }) => (
          <ListFile actor={file.actor} style={{ paddingHorizontal: 20 }} />
        )}
        getItemLayout={(_data, index) => ({
          length: LIST_FILE_HEIGHT,
          offset: LIST_FILE_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
};

export default List;
