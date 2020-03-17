import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import Typography from './Typography';

const Styles = StyleSheet.create({
  button: {
    width: 'auto',
    borderRadius: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

interface ButtonProps {
  children: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  size?: 'md' | 'sm';
  color?: string;
}

const Button = ({ children, onPress, style, size = 'md', color, backgroundColor }: ButtonProps) => (
  <TouchableOpacity onPress={onPress} style={[Styles.button, style, { backgroundColor }]}>
    <Text style={[size === 'md' ? Typography.caption2 : Typography.caption, { color }]}>
      {children}
    </Text>
  </TouchableOpacity>
);

export default Button;
