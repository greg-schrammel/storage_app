import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native-web';

interface ButtonProps {
  children?: string | ReactElement;
  onPress?: () => void;
  outlined?: boolean;
  bgColor?: string;
  color?: string;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    borderWidth: 1,
    fontWeight: 900,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solid: {
    color: 'white',
    backgroundColor: 'black',
  },
  outlined: {
    color: 'black',
    backgroundColor: 'white',
  },
});

export default function Button({ children, outlined, onPress }: ButtonProps): ReactElement {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, outlined ? styles.outlined : styles.solid]}
    >
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
