import * as React from 'react';
import { Text, TouchableHighlight } from 'react-native';

import Icon from 'components/Icon';

const MenuItem = ({ icon, label, onPress, iconSize = 18 }) => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor="whitesmoke"
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 15,
      width: '100%',
    }}
    hitSlop={{ top: 5, bottom: 5, left: 40, right: 40 }}
  >
    <>
      <Icon name={icon} size={iconSize} />
      <Text style={{ paddingLeft: 10 }}>{label}</Text>
    </>
  </TouchableHighlight>
);

export default MenuItem;
