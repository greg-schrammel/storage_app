import React from 'react';
import { Image } from 'react-native';

import logo_white from 'assets/logo_white.png';
import logo_black from 'assets/logo_black.png';

const Logo = ({ width, height, black }) => (
  <Image
    style={{
      width,
      height,
      resizeMode: 'contain',
    }}
    source={black ? logo_black : logo_white}
  />
);

export default Logo;
