import * as React from 'react';
import { Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import Icon from 'components/Icon';
import Typography from 'components/Typography';
import { Item } from '@types/item';

interface SortButtonProps {
  style: StyleProp<ViewStyle>;
  onPress: () => void;
  by: SortByKeys;
  direction: 'up' | 'down';
  disabled: boolean;
}

export type SortByKeys = 'name' | 'creationTime' | 'fileType';

export const sort = (files: Array<Item>, by: SortByKeys, direction: 'up' | 'down') => {
  return direction === 'up' ? files.sort() : files.sort().reverse();
};

export default ({ style, onPress, by, direction, disabled }: SortButtonProps) => {
  return (
    <TouchableOpacity
      style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
      hitSlop={{ top: 20, right: 40, bottom: 20, left: 40 }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[Typography.caption, { paddingRight: 3 }, disabled && { color: 'lightgrey' }]}>
        {by}
      </Text>
      <Icon name={`arrow-${direction}`} size={10} color="lightgrey" />
    </TouchableOpacity>
  );
};
