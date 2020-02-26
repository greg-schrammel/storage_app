import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const Styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 20,

    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'black',

    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontWeight: '800',
    fontSize: 15,
  },
});

const Button = ({ text, onPress, styles }) => (
  <TouchableOpacity onPress={onPress} style={[Styles.button, styles.button]}>
    <Text style={[Styles.label, styles.label]}>{text}</Text>
  </TouchableOpacity>
);

export default Button;
