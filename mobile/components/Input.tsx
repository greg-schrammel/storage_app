/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from 'react-native';

import Icon, { IconName } from 'components/Icon';
import Typography from 'components/Typography';

const Styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: 'whitesmoke',
    flexDirection: 'row',
    padding: 8,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
});

interface InputProps extends TextInputProps {
  icon?: IconName;
  label?: string;
  style?: StyleProp<ViewStyle>;
}

const Input = ({ icon, style, ...props }: InputProps) => (
  <View style={[Styles.input, style]}>
    {icon && <Icon name={icon} size={20} color="lightgrey" style={{ marginRight: 10 }} />}
    <TextInput style={Styles.text} {...props} />
  </View>
);

const InputWithLabel = ({ label, style, ...props }: InputProps) => (
  <View style={[{ alignItems: 'center', flexDirection: 'row' }, style]}>
    <Text style={Typography.subheader}>{label}</Text>
    <Input {...props} style={{ marginLeft: 5, flex: 1 }} />
  </View>
);

export default ({ label, ...props }: InputProps) =>
  label ? <InputWithLabel label={label} {...props} /> : <Input {...props} />;
