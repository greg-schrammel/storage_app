import * as React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

interface CardProps {
  style: StyleProp<ViewStyle>;
  children: React.ReactElement | Array<React.ReactElement>;
}

const Card = ({ children, style }: CardProps) => (
  <View style={[Styles.container, style]}>{children}</View>
);

export default Card;
