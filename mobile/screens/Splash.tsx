import * as React from 'react';
import { Animated, Image } from 'react-native';
import { SplashScreen } from 'expo';

function Splash({ isVisible, onHide, img }) {
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
        source={require(img)}
      />
    </Animated.View>
  );
}

export default Splash;
