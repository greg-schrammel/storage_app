import * as React from 'react';
import { Animated, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'components/Icon';
import { useFinder } from '../../FinderProvider';

const Styles = StyleSheet.create({
  position: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 84,
    backgroundColor: 'whitesmoke',
    borderTopColor: 'lightgrey',
    borderTopWidth: 0.5,
  },
});

export const EditingModal = () => {
  const [state, send] = useFinder();
  const [canRender, setCanRender] = React.useState(false); // first hide the bottom tab bar then render this one
  const navigation = useNavigation();
  React.useEffect(() => {
    if (state.matches('listing.editing')) {
      navigation.setOptions({ tabBarVisible: false });
      setCanRender(true);
    }
    return () => {
      navigation.setOptions({ tabBarVisible: true });
    };
  }, [state.value, navigator]);
  return canRender ? (
    <Animated.View style={Styles.position}>
      <SafeAreaView style={Styles.container}>
        <Icon name="share" color="dodgerblue" size={24} />
        <Icon name="folder" color="dodgerblue" size={24} />
        <Icon name="clipboard" color="dodgerblue" size={24} />
        <Icon name="trash" color="dodgerblue" size={24} />
      </SafeAreaView>
    </Animated.View>
  ) : null;
};

export default EditingModal;
