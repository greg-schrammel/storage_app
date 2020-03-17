import * as React from 'react';
import { View, Text } from 'react-native';

import Icon from 'components/Icon';
import Typography from 'components/Typography';
import Logo from 'components/Logo';

const TopBar = ({ onBack, backLabel, children }) => (
  <View
    style={{
      height: 60,
      padding: 15,
    }}
  >
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {backLabel && [
          <Icon onPress={onBack} name="arrow-left" size={20} />,
          <Text style={Typography.caption2}>{backLabel}</Text>,
        ]}
      </View>
      {children}
    </View>
  </View>
);

export default TopBar;
