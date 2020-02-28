import * as React from 'react';
import { useRef, useState, useLayoutEffect } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  View,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'components/Icon';
import { BlurView } from 'expo-blur';

const Styles = StyleSheet.create({
  modal: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

const ItemType = ({ icon, label }) => (
  <View
    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}
  >
    <Icon name={icon} size={24} />
    <Text style={{ paddingLeft: 10 }}>{label}</Text>
  </View>
);

const BluryOverlay = ({ children, onDismiss }) => (
  <Modal transparent visible animationType="fade">
    <TouchableWithoutFeedback onPressOut={onDismiss}>
      <BlurView tint="light" intensity={75} style={StyleSheet.absoluteFill}>
        {children}
      </BlurView>
    </TouchableWithoutFeedback>
  </Modal>
);

const Position = ({ width, x, y, left, top, children }) => (
  <View
    style={{
      position: 'absolute',
      ...(left ? { right: Dimensions.get('window').width - x - width / 2 } : { left: x }),
      ...(top ? { bottom: Dimensions.get('window').height - y } : { top: y }),
    }}
  >
    {children}
  </View>
);

const Popup = ({ children, trigger, position }) => {
  const target = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [layout, setLayout] = useState();

  // useLayoutEffect doesnt seems to work,
  // and the onLayout callback does not give me the correct "y"
  // (it's based on parent component, not in the whole window)
  const calculateLayout = React.useCallback(() => {
    if (layout) return;
    target.current.measureInWindow((x, y, width, height) => setLayout({ x, y, width, height }));
  }, [target]);

  return !isOpen ? (
    <TouchableOpacity ref={target} onLayout={calculateLayout} onPress={() => setOpen(true)}>
      {trigger}
    </TouchableOpacity>
  ) : (
    <BluryOverlay onDismiss={() => setOpen(false)}>
      <Position x={layout.x} y={layout.y}>
        {trigger}
      </Position>
      <Position left width={layout.width} x={layout.x} y={layout.y + 30}>
        {children}
      </Position>
    </BluryOverlay>
  );
};

const AddItemButton = () => {
  return (
    <Popup trigger={<Icon name="plus" size={24} />}>
      <View style={[Styles.modal, { width: 200 }]}>
        <ItemType label="Adicionar da Galeria" icon="photo" />
        <ItemType label="Nova Pasta" icon="folder-o" />
      </View>
    </Popup>
  );
};

export default AddItemButton;
