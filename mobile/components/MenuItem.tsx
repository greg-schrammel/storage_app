import * as React from 'react';
import { Text, TouchableHighlight } from 'react-native';

import Icon from 'components/Icon';
import Typography from './Typography';

const MenuItem = ({ icon, label, onPress, iconSize = 24 }) => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor="whitesmoke"
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 30,
      width: '100%',
    }}
    hitSlop={{ top: 5, bottom: 5, left: 40, right: 40 }}
  >
    <>
      <Icon name={icon} size={iconSize} />
      <Text style={[Typography.body, { paddingLeft: 10 }]}>{label}</Text>
    </>
  </TouchableHighlight>
);

export default MenuItem;
