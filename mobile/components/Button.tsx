import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, RegisteredStyle } from 'react-native';
import Icon from './Icon';

const Styles = StyleSheet.create({
  button: {
    width: 'auto',

    borderRadius: 10,
    backgroundColor: 'transparent',

    alignItems: 'center',
    justifyContent: 'center',
  },
  size_md: {
    padding: 10,
    margin: 20,
  },
  size_lg: {
    padding: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
  },
});

interface ButtonProps {
  children: string;
  onPress: () => void;
  style?: RegisteredStyle<TouchableOpacity>;
  size?: 'md' | 'lg';
  color?: string;
  backgroundColor?: string;
}

const Button = ({ children, onPress, style, size = 'md', color, backgroundColor }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      Styles.button,
      style,
      { backgroundColor },
      size === 'md' && Styles.size_md,
      size === 'lg' && Styles.size_lg,
    ]}
  >
    <Text style={[Styles.label, { color, fontWeight: size === 'md' ? '600' : '800' }]}>
      {children}
    </Text>
  </TouchableOpacity>
);

export default Button;
