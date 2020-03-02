/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

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
    fontSize: 16,
  },
});

const Input = ({ icon, style, ...props }) => (
  <View style={[Styles.input, style]}>
    {icon && <Icon name={icon} size={20} color="lightgrey" style={{ marginRight: 10 }} />}
    <TextInput style={Styles.text} {...props} />
  </View>
);

const InputWithLabel = ({ label, style, ...props }) => (
  <View style={{ alignItems: 'center', flexDirection: 'row', ...style }}>
    <Text style={{ fontWeight: '700' }}>{label}</Text>
    <Input {...props} style={{ marginLeft: 5 }} />
  </View>
);

export default ({ label, ...props }) =>
  label ? <InputWithLabel label={label} {...props} /> : <Input {...props} />;
