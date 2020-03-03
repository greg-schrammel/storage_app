import * as React from 'react';
import { useRef, useState, useCallback } from 'react';
import { View, Dimensions, ModalBaseProps, findNodeHandle } from 'react-native';

import BluryOverlay from 'components/BluryOverlay';
import Card from 'components/Card';

interface PositionProps {
  width?: number;
  x: number;
  y: number;
  left?: boolean;
  top?: boolean;
  children: React.ReactElement;
}

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

const Position = ({ width, x, y, left, top, children }: PositionProps) => (
  <View
    style={{
      position: 'absolute',
      ...(left ? { right: Dimensions.get('window').width - x - width / 2 } : { left: x }),
      ...(top ? { bottom: Dimensions.get('window').height - y } : { top: y }),
    }}
  >
    {children}
  </View>
);

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
  const [triggerLayout, setTriggerLayout] = useState<NativeMeasureLayout>();
  const [containerPosition, setContainerPosition] = useState({ top, left });

  // useLayoutEffect doesnt seems to work,
  // and the onLayout callback does not give me the correct "y"
  // (it's based on parent component, not in the whole window)
  const calculateTriggerPosition = () =>
    triggerRef.current.measure((ox, oy, width, height, x, y) =>
      setTriggerLayout({ x, y, width, height }),
    );

  const repositionWhenOutOfScreen = () => {
    containerRef.current.measure((ox, oy, width, height, x, y) => {
      const canBeOnBottom = y + height + 20 <= Dimensions.get('window').height; // add 20 for safe area etc
      const canBeOnLeft = x + width <= Dimensions.get('window').width;
      setContainerPosition({ top: , left: !shouldBeOnRight });
    });
  };

  const position = `${containerPosition.top ? 'Bottom' : 'Top'}${
    containerPosition.left ? 'Right' : 'Left'
  }`; // if it's left the pointy thingy is in the right etc...

  return !isOpen ? (
    <View ref={triggerRef} onLayout={calculateTriggerPosition}>
      {trigger}
    </View>
  ) : (
    <BluryOverlay onPressOut={onPressOut} intensity={blurIntensity} animationType={animationType}>
      <Position x={triggerLayout.x} y={triggerLayout.y}>
        {openTrigger}
      </Position>
      <Position
        left={containerPosition.left}
        top={containerPosition.top}
        width={triggerLayout.width}
        x={triggerLayout.x}
        y={triggerLayout.y + (containerPosition.top ? 0 : triggerLayout.height)}
      >
        <View ref={containerRef} onLayout={repositionWhenOutOfScreen}>
          <Card style={{ paddingVertical: 10, width: 'auto', [`border${position}Radius`]: 5 }}>
            {children}
          </Card>
        </View>
      </Position>
    </BluryOverlay>
  );
};

export default Popup;
