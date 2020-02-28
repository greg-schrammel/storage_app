import * as React from 'react';
import { forwardRef } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
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
}

// TODO: make it beautiful
const Icon = forwardRef(({ name, size, color, style }: IconProps, ref: React.RefObject<View>) => (
  <View style={[style, { width: size }]} ref={ref}>
    {{
      folder: () => <FontAwesome name="folder" color={color || '#00BFFF'} size={size} />,
      'folder-o': () => <FontAwesome name="folder-o" color={color} size={size} />,
      mp3: () => <FontAwesome name="music" color={color} size={size} />,
      'ellipsis-v': () => <FontAwesome name="ellipsis-v" size={size} color={color} />,
      plus: () => <FontAwesome name="plus" size={size} color={color} />,
      search: () => <FontAwesome name="search" size={size} color={color} />,
      user: () => <FontAwesome name="user" size={size} color={color} />,
      star: () => <FontAwesome name="star" size={size} color={color} />,
      photo: () => <FontAwesome name="photo" size={size} color={color} />,
    }[name]()}
  </View>
));

export default Icon;
