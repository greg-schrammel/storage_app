import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
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
  labelStyle?: StyleProp<TextStyle>;
}

const Button = ({ children, onPress, style, labelStyle }: ButtonProps) => (
  <TouchableOpacity onPress={onPress} style={[Styles.button, style]}>
    <Text style={[Typography.caption2, labelStyle]}>{children}</Text>
  </TouchableOpacity>
);

export default Button;
