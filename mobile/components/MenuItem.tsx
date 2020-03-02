import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Icon from 'components/Icon';

const MenuItem = ({ icon, label, onPressOut, iconSize = 18 }) => (
  <TouchableOpacity
    onPressOut={onPressOut}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
    }}
  >
    <Icon name={icon} size={iconSize} />
    <Text style={{ paddingLeft: 10 }}>{label}</Text>
  </TouchableOpacity>
);

export default MenuItem;
