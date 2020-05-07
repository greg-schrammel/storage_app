import * as React from 'react';
import { Animated, Image } from 'react-native';
import { SplashScreen } from 'expo';

function Splash({ isVisible, onHide }) {
  const opacity = React.useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    SplashScreen.preventAutoHide();
  }, []);
  React.useEffect(() => {
    if (!isVisible) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        onHide();
      });
    }
  }, [isVisible, onHide]);
  return (
    <Animated.View
      style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, { opacity }]}
    >
      <Image
        onLoadEnd={() => SplashScreen.hide()}
        style={{ width: '100%', resizeMode: 'contain' }}
        // eslint-disable-next-line global-require
        source={require('assets/splash.png')}
      />
    </Animated.View>
  );
}

export default Splash;
