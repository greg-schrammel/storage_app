/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, ViewProperties } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    width: 'auto',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

interface CardProps extends ViewProperties {
  style: StyleProp<ViewStyle>;
  children: React.ReactElement | Array<React.ReactElement>;
}

const Card = React.forwardRef(
  ({ children, style, ...props }: CardProps, ref: React.RefObject<View>) => (
    <View {...props} ref={ref} style={[Styles.container, style]}>
      {children}
    </View>
  ),
);

export default Card;
