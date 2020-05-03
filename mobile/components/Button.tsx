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
    flexDirection: 'row',
  },
});

interface ButtonProps {
  children: string;
  icon: React.ReactElement | void;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const Button = ({ children, onPress, style, labelStyle, icon }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[Styles.button, style /* icon && { justifyContent: 'flex-start' } */]}
  >
    {icon}
    <Text style={[Typography.caption2, labelStyle, { flex: 1, textAlign: 'center' }]}>
      {children}
    </Text>
  </TouchableOpacity>
);

export default Button;
