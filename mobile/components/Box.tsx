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
    // overflow: 'hidden',
  },
});

interface BoxProps extends ViewProperties {
  style?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  children: React.ReactElement | Array<React.ReactElement>;
}

const Box = React.forwardRef(
  ({ children, style, ...props }: BoxProps, ref: React.RefObject<View>) => (
    <View {...props} ref={ref} style={[Styles.container, style].flat()}>
      {children}
    </View>
  ),
);

export default Box;
