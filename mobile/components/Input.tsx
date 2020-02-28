/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import Icon from 'components/Icon';

const Styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: 'whitesmoke',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    color: 'silver',
    fontWeight: '600',
    fontSize: 15,
  },
});

const Input = ({ icon, style, ...props }) => (
  <View style={[Styles.input, style]}>
    <Icon name={icon} size={20} color="lightgrey" />
    <TextInput style={Styles.text} {...props} />
  </View>
);

export default Input;
