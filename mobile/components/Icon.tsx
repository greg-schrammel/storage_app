import * as React from 'react';
import { forwardRef } from 'react';
import { View, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface IconProps {
  name:
    | 'folder'
    | 'folder-o'
    | 'mp3'
    | 'ellipsis-v'
    | 'plus'
    | 'search'
    | 'user'
    | 'star'
    | 'photo';
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  _ref?: React.RefObject<TouchableOpacity>;
}

// TODO: make it beautiful
const Icon = ({ name, size, color, style, onPress, _ref }: IconProps) => (
  <TouchableOpacity
    activeOpacity={onPress ? 0.2 : 1}
    onPress={onPress}
    hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
    ref={_ref}
  >
    <View style={[style, { width: size, alignItems: 'center', justifyContent: 'center' }]}>
      {{
        folder: () => <FontAwesome name="folder" color={color || 'deepskyblue'} size={size} />,
        'folder-o': () => <FontAwesome name="folder-o" color={color} size={size} />,
        mp3: () => <FontAwesome name="music" color={color} size={size} />,
        'ellipsis-v': () => <FontAwesome name="ellipsis-v" size={size} color={color} />,
        plus: () => <FontAwesome name="plus" size={size} color={color} />,
        search: () => <FontAwesome name="search" size={size} color={color} />,
        user: () => <FontAwesome name="user" size={size} color={color} />,
        star: () => <FontAwesome name="star" size={size} color={color} />,
        photo: () => <FontAwesome name="photo" size={size - 2} color={color} />, // (?) this size is 2 larger
        'i-cursor': () => <FontAwesome name="i-cursor" size={size} color={color} />,
        'star-o': () => <FontAwesome name="star-o" size={size} color={color} />,
        copy: () => <FontAwesome name="copy" size={size} color={color} />,
        'trash-o': () => <FontAwesome name="trash-o" size={size} color={color} />,
        'share-square-o': () => <FontAwesome name="share-square-o" size={size} color={color} />,
      }[name]()}
    </View>
  </TouchableOpacity>
);

export default forwardRef((props: IconProps, ref: React.RefObject<TouchableOpacity>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon _ref={ref} {...props} />
));
