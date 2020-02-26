import React, { useState, useRef, useEffect, forwardRef } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons';
import { statusBarHeight } from 'expo-constants';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
);

const Icon = forwardRef(({ name, size = 46, color, style, onLayout }, ref) => (
  <View style={{ ...style, width: size }} ref={ref} onLayout={onLayout}>
    {{
      folder: () => <FontAwesome name="folder" color={color || '#00BFFF'} size={size} />,
      'folder-o': () => <FontAwesome name="folder-o" color={color} size={size} />,
      mp3: () => <FontAwesome name="music" color={color} size={size} />,
      'ellipsis-v': () => <FontAwesome name="ellipsis-v" size={size} color={color} />,
      plus: () => <FontAwesome name="plus" size={size} color={color} />,
      search: () => <FontAwesome name="search" size={size} color={color} />,
      user: () => <FontAwesome name="user" size={size} color={color} />,
      star: () => <FontAwesome name="star" size={size} color={color} />,
    }[name]()}
  </View>
));

const Input = ({ icon, style, ...props }) => (
  <View
    style={{
      borderRadius: 10,
      backgroundColor: 'whitesmoke',
      flex: 1,
      flexDirection: 'row',
      padding: 10,
      ...style,
    }}
  >
    <Icon name={icon} size={20} color="lightgrey" />
    <TextInput
      style={{ flex: 1, marginLeft: 10, color: 'silver', fontWeight: '600', fontSize: 15 }}
      {...props}
    />
  </View>
);

const Item = ({ name, type }) => (
  <TouchableOpacity delayPressIn={50}>
    <View
      style={{ paddingVertical: 5, marginVertical: 8, alignItems: 'center', flexDirection: 'row' }}
    >
      <Icon name={type} size={46} style={{ marginRight: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 2 }}>{name}</Text>
        <Text style={{ fontSize: 12, fontWeight: '600', color: 'silver' }}>6 items</Text>
      </View>
      <Icon name="ellipsis-v" size={17} color="silver" />
    </View>
  </TouchableOpacity>
);

const data = [
  { id: '12313', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '1231', type: 'mp3', name: 'pastaaaa', contents: 1000101 },
  { id: '12213123313', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '121223443', type: 'folder', name: 'pastaaaa', contents: 1000101 },
  { id: '12322213', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '1222323443', type: 'folder', name: 'pastaaaa', contents: 1000101 },
  { id: '123123333', type: 'folder', name: 'musica 1', contents: 1000101 },
  { id: '12232123443', type: 'folder', name: 'pastaaaa', contents: 1000101 },
];

const Directory = ({ style }) => (
  <View style={{ backgroundColor: '#fff', ...style }}>
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Item type={item.type} id={item.id} name={item.name} />}
    />
    <LinearGradient
      style={{ position: 'absolute', bottom: 0, width: '100%', height: 20 }}
      colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 1)']}
      pointerEvents="none"
    />
  </View>
  // key={grid ? 'grid' : 'list'}
  // numColumns={grid ? 2 : 1}
);

const ListHeader = ({ style }) => {
  return (
    <View style={style}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 32, fontWeight: '800' }}>Seus Arquivos</Text>
        <AddButton />
      </View>
      <Text
        style={{
          fontSize: 16,
          color: 'silver',
          fontWeight: '600',
          margin: 10,
          marginTop: 5,
        }}
      >
        /Pasta1/PastaFilho2
      </Text>
    </View>
  );
};

const AddButton = () => {
  const [isOpen, setOpen] = useState(false);
  const target = useRef(null);
  const [layout, setPosition] = useState();
  useEffect(() => {
    if (target.current && !layout)
      target.current.measureInWindow((x, y, width, height) => setPosition({ x, y, width, height }));
  }, [target]);
  return (
    <>
      {isOpen || (
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Icon ref={target} name="plus" size={24} />
        </TouchableOpacity>
      )}
      {isOpen && (
        <Modal transparent visible animationType="fade">
          <TouchableWithoutFeedback onPressOut={() => setOpen(false)}>
            <BlurView tint="light" intensity={75} style={StyleSheet.absoluteFill}>
              <View
                style={{
                  position: 'absolute',
                  top: layout.y,
                  right: Dimensions.get('window').width - layout.x - layout.width,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
              >
                <Icon name="plus" size={24} />
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      marginTop: 20,
                      padding: 15,
                      backgroundColor: 'white',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      borderRadius: 20,
                      shadowColor: 'black',
                      shadowOpacity: 0.1,
                      shadowRadius: 10,
                      maxWidth: layout.x,
                    }}
                  >
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                      <Icon ref={target} name="folder-o" size={24} />
                      <Text>Criar Pasta</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                      <Icon ref={target} name="folder-o" size={24} />
                      <Text>Criar Pasta</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                      <Icon ref={target} name="folder-o" size={24} />
                      <Text>Criar Pasta</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                      <Icon ref={target} name="folder-o" size={24} />
                      <Text>Criar Pasta</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                      <Icon ref={target} name="folder-o" size={24} />
                      <Text>Criar Pasta</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                      <Icon ref={target} name="folder-o" size={24} />
                      <Text>Criar Pasta</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </BlurView>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
};

const Header = () => {
  const [search, onSearchValue] = useState('');
  return (
    <View
      style={{
        height: 80,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Input
        icon="search"
        placeholder="Busca"
        returnKeyType="search"
        clearButtonMode="while-editing"
        value={search}
        onChangeText={onSearchValue}
        style={{ marginRight: 20 }}
      />
      <Icon name="user" size={24} color="lightgrey" />
    </View>
  );
};

export default function DirectoryScreen() {
  return (
    <DismissKeyboard>
      <SafeAreaView style={{ flex: 1, marginTop: statusBarHeight, marginHorizontal: 20 }}>
        <Header />
        <ListHeader style={{ marginBottom: 5 }} />
        <Directory style={{ paddingRight: 20, marginRight: -20 }} />
      </SafeAreaView>
    </DismissKeyboard>
  );
}
