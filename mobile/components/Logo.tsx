import React from 'react';
import { Image } from 'react-native';

import logo_white from 'assets/logo_white.png';
import logo_black from 'assets/logo_black.png';

const Logo = ({ style, width, height = '100%', black }) => (
  <Image
    style={[
      {
        width,
        height,
        resizeMode: 'contain',
      },
      style,
    ]}
    source={black ? logo_black : logo_white}
  />
);

export default Logo;
