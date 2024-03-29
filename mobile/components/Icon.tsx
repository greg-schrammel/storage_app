/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { forwardRef } from 'react';
import { View, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

export type IconName =
  | 'folder'
  | 'folder-o'
  | 'mp3'
  | 'ellipsis-v'
  | 'plus'
  | 'search'
  | 'user'
  | 'star'
  | 'photo'
  | 'file-audio-o'
  | 'file-photo-o'
  | 'file-video-o'
  | 'file-zip-o'
  | 'file-o'
  | 'arrow-down';

interface IconProps {
  name: string | IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  _ref?: React.RefObject<TouchableOpacity>;
}

const Icons = {
  photo: ({ size, color }) => <FontAwesome name="photo" size={size - 2} color={color} />, // (?) this size is 2 larger
  search: ({ size, color }) => <FontAwesome name="search" size={size - 2} color={color} />, // (?) this size is 2 larger
  plus: ({ size, color }) => (
    <FontAwesome name="plus" size={size} color={color} style={{ height: size - 1 }} />
  ), // (?) OK IM STARTING TO HATE THIS MFKNG ICONS
  clipboard: ({ size, color }) => <FontAwesome5 name="clipboard" size={size} color={color} />,
};

const Icon = ({ name, size, color, style, _ref }: IconProps) => {
  const RawIcon = Icons[name] || (props => <FontAwesome name={name} {...props} />);
  return (
    <View ref={_ref} style={[style, { alignItems: 'center', justifyContent: 'center' }]}>
      <RawIcon size={size} color={color} />
    </View>
  );
};

const TouchableIcon = ({ onPress, _ref, style, ...props }: IconProps) => (
  <TouchableOpacity
    onPress={onPress}
    hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
    ref={_ref}
    style={style}
  >
    <Icon {...props} />
  </TouchableOpacity>
);

export default forwardRef((props: IconProps, ref: React.RefObject<TouchableOpacity>) =>
  props.onPress ? <TouchableIcon _ref={ref} {...props} /> : <Icon _ref={ref} {...props} />,
);
