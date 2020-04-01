import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import Icon from 'components/Icon';
import Popup from 'components/Popup';
import MenuItem from 'components/MenuItem';
import Typography from 'components/Typography';

interface SortByProps {
  style: StyleProp<ViewStyle>;
  direction: 'up' | 'down';
  by: SortByKeys;
  onValue: (v: SortByKeys) => void;
}

export type SortByKeys = 'name' | 'creationTime' | 'fileType';

<<<<<<< Updated upstream
const SortBy = ({ style, by, direction, onValue }: SortByProps) => {
=======
const SortBy = ({ style, by, direction, onValue, disabled }: SortByProps) => {
>>>>>>> Stashed changes
  const [isOpen, setOpen] = useState(false);
  return (
    <View style={[style, { marginTop: 5, width: 70 }]}>
      <Popup
        isOpen={isOpen}
        onPressOutside={() => setOpen(false)}
        trigger={
          <TouchableOpacity
            style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
            hitSlop={{ top: 20, right: 40, bottom: 20, left: 40 }}
            onPress={() => setOpen(true)}
          >
            <Text style={[Typography.caption, { paddingRight: 3 }]}>{by}</Text>
            <Icon name={`arrow-${direction}`} size={10} color="lightgrey" />
          </TouchableOpacity>
        }
      >
        <MenuItem icon="clock-o" label="Data de Criação" onPress={() => onValue('creationTime')} />
        <MenuItem icon="font" label="Nome" onPress={() => onValue('name')} />
        <MenuItem icon="font" label="Tipo" onPress={() => onValue('fileType')} />
      </Popup>
    </View>
  );
};

export default SortBy;
