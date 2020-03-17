import * as React from 'react';
import { View } from 'react-native';

import Icon from 'components/Icon';

import DirectoryScreen from 'screens/Directory';

export default function App() {
  // const [route, setRoute] = React.useState('Directory');
  return (
    <>
      <View style={{ height: 700 }}>
        <DirectoryScreen />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginHorizontal: 40,
          padding: 10,
        }}
      >
        <Icon name="star" size={24} color="lightgrey" />
        <Icon name="folder" size={24} color="dodgerblue" />
        <Icon name="user" size={24} color="lightgrey" />
      </View>
    </>
  );
}
