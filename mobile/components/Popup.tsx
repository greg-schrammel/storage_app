import * as React from 'react';
import { useRef, useState } from 'react';
import { View, Dimensions, ModalBaseProps, StyleProp, ViewStyle } from 'react-native';
import Constants from 'expo-constants';

import BluryOverlay from 'components/BluryOverlay';
import Box from 'components/Box';

interface PopupProps {
  children: React.ReactElement | Array<React.ReactElement>;
  trigger?: React.ReactElement;
  openTrigger?: React.ReactElement;
  isOpen: boolean;
  onPressOutside: () => void;
  top?: boolean;
  left?: boolean;
  blurIntensity?: number;
  animationType?: ModalBaseProps['animationType'];
  reposition?: boolean;
}

interface NativeMeasureLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PositionStyles {
  x: number;
  y: number;
  left?: boolean;
  top?: boolean;
}

const positionStyles = ({ x, y, left, top }: PositionStyles): StyleProp<ViewStyle> => ({
  position: 'absolute',
  ...(left ? { right: Dimensions.get('window').width - x } : { left: x }),
  ...(top ? { bottom: Dimensions.get('window').height - y } : { top: y }),
});

// Probably won't work on landscape
const Popup = ({
  children,
  trigger,
  openTrigger = trigger,
  isOpen,
  onPressOutside,
  top = false,
  left = false,
  blurIntensity,
  animationType,
  reposition = false,
}: PopupProps) => {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const [containerPosition, setContainerPosition] = useState({ top, left });
  const [triggerLayout, setTriggerLayout] = useState<NativeMeasureLayout>();
  const [readyToRender, setReadyToRender] = useState(!reposition);

  // useLayoutEffect doesnt seems to work,
  // and the onLayout callback does not give me the correct "y"
  // (it's based on parent component, not in the whole window)
  const calculateTriggerPosition = () =>
    triggerRef.current.measureInWindow((x, y, width, height) =>
      setTriggerLayout({ x, y, width, height }),
    );

  const repositionWhenOutOfScreen = () => {
    if (!reposition) return;
    containerRef.current.measureInWindow((_x, _y, width, height) => {
      const canBeOnBottom = triggerLayout.y + height + 20 <= Dimensions.get('window').height; // add 20 for safe area like Iphone X+ home indicator
      const canBeOnTop = triggerLayout.y - height - Constants.statusBarHeight >= 0;
      const canBeOnRight = triggerLayout.x + width <= Dimensions.get('window').width;
      const canBeOnLeft = triggerLayout.x - width >= 0;
      setContainerPosition({
        top: top ? canBeOnTop : !canBeOnBottom,
        left: left ? canBeOnLeft : !canBeOnRight,
      });
      setReadyToRender(true);
    });
  };

  const containerPositionStyles = () =>
    positionStyles({
      left: containerPosition.left,
      top: containerPosition.top,
      x: triggerLayout.x + triggerLayout.width / 2,
      y: triggerLayout.y + (containerPosition.top ? 0 : triggerLayout.height),
    });

  const triggerPositionStyles = () =>
    positionStyles({
      x: triggerLayout.x,
      y: triggerLayout.y,
    });

  const position = `${containerPosition.top ? 'Bottom' : 'Top'}${
    containerPosition.left ? 'Right' : 'Left'
  }`; // if it's left the pointy thingy is in the right etc...

  return (
    <>
      <View ref={triggerRef} onLayout={calculateTriggerPosition}>
        {trigger}
      </View>
      {isOpen && (
        <BluryOverlay
          onPress={onPressOutside}
          intensity={blurIntensity}
          animationType={animationType}
        >
          {blurIntensity > 0 && <View style={triggerPositionStyles()}>{openTrigger}</View>}
          <Box
            ref={containerRef}
            onLayout={repositionWhenOutOfScreen}
            style={[
              containerPositionStyles(),
              { opacity: readyToRender ? 100 : 0, [`border${position}Radius`]: 5 },
              { paddingVertical: 10, marginVertical: 5 },
            ]}
          >
            {children}
          </Box>
        </BluryOverlay>
      )}
    </>
  );
};

export default Popup;
