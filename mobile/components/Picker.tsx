import * as React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Modal from 'react-native-modal';

import { string } from 'prop-types';
import Typography from './Typography';
import Button from './Button';

const Styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 40,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
    marginBottom: 5,
    padding: 10,
    alignItems: 'center',
  },
  cancelButton: {
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 15,
    backgroundColor: 'whitesmoke',
  },
});

interface PickerProps {
  children: React.ReactElement | Array<React.ReactElement>;
  onDismiss: () => void;
  above?: React.ReactElement;
  title?: string;
}

const Picker = ({ above, children, title, onDismiss }: PickerProps) => {
  const [isVisible, setVisible] = React.useState(true);
  return (
    <Modal
      isVisible={isVisible}
      animationInTiming={200}
      animationOutTiming={200}
      onBackdropPress={() => setVisible(false)}
      onModalHide={onDismiss}
      style={{ margin: 0 }}
    >
      {above}
      <View style={Styles.container}>
        {title && (
          <View style={Styles.titleContainer}>
            <Text style={[Typography.header]}>{title}</Text>
          </View>
        )}
        {children}
        <Button onPress={() => setVisible(false)} style={Styles.cancelButton}>
          Cancelar
        </Button>
      </View>
    </Modal>
  );
};

export default Picker;
