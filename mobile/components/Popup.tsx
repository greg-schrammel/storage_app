import * as React from 'react';
import { useRef, useState } from 'react';
import { View, Dimensions, ModalBaseProps, StyleProp, ViewStyle } from 'react-native';

import BluryOverlay from 'components/BluryOverlay';
import Card from 'components/Card';

interface PopupProps {
  children: React.ReactElement | Array<React.ReactElement>;
  trigger: React.ReactElement;
  openTrigger: React.ReactElement;
  isOpen: boolean;
  onPressOut: () => void;
  top?: boolean;
  left?: boolean;
  blurIntensity?: number;
  animationType?: ModalBaseProps['animationType'];
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
  onPressOut,
  top = false,
  left = false,
  blurIntensity,
  animationType,
}: PopupProps) => {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const [containerPosition, setContainerPosition] = useState({ top, left });
  const [triggerLayout, setTriggerLayout] = useState<NativeMeasureLayout>();
  const [readyToRender, setReadyToRender] = useState(false);

  // useLayoutEffect doesnt seems to work,
  // and the onLayout callback does not give me the correct "y"
  // (it's based on parent component, not in the whole window)
  const calculateTriggerPosition = () =>
    triggerRef.current.measure((_x, _y, width, height, x, y) =>
      setTriggerLayout({ x, y, width, height }),
    );

  const repositionWhenOutOfScreen = () => {
    containerRef.current.measureInWindow((_x, _y, width, height) => {
      const canBeOnBottom = triggerLayout.y + height + 20 <= Dimensions.get('window').height; // add 20 for safe area like Iphone X+ home indicator
      const canBeOnTop = triggerLayout.y - height - 20 >= 0; // add 20 for safe area like Iphone X+ top notch
      const canBeOnRight = triggerLayout.x + width <= Dimensions.get('window').width;
      const canBeOnLeft = triggerLayout.x - width >= 0;
      setContainerPosition({
        top: top ? canBeOnTop : !canBeOnBottom,
        left: left ? canBeOnLeft : !canBeOnRight,
      });
      setReadyToRender(true);
    });
  };

  const containerPositionStyles = positionStyles({
    left: containerPosition.left,
    top: containerPosition.top,
    x: triggerLayout.x + triggerLayout.width / 2,
    y: triggerLayout.y + (containerPosition.top ? 0 : triggerLayout.height),
  });

  const triggerPositionStyles = positionStyles({
    x: triggerLayout.x,
    y: triggerLayout.y,
  });

  const position = `${containerPosition.top ? 'Bottom' : 'Top'}${
    containerPosition.left ? 'Right' : 'Left'
  }`; // if it's left the pointy thingy is in the right etc...

  return !isOpen ? (
    <View ref={triggerRef} onLayout={calculateTriggerPosition}>
      {trigger}
    </View>
  ) : (
    <>
      {blurIntensity === 0 && (
        <View ref={triggerRef} onLayout={calculateTriggerPosition}>
          {trigger}
        </View>
      )}
      <BluryOverlay onPressOut={onPressOut} intensity={blurIntensity} animationType={animationType}>
        {blurIntensity !== 0 && <View style={triggerPositionStyles}>{openTrigger}</View>}
        <Card
          ref={containerRef}
          onLayout={repositionWhenOutOfScreen}
          style={[
            containerPositionStyles,
            { opacity: readyToRender ? 100 : 0, [`border${position}Radius`]: 5 },
            { paddingVertical: 10, marginVertical: 5 },
          ]}
        >
          {children}
        </Card>
      </BluryOverlay>
    </>
  );
};

export default Popup;
