import * as React from 'react';
import { useRef, useState, useCallback } from 'react';
import { View, Dimensions, ModalBaseProps } from 'react-native';

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
  top,
  left,
  blurIntensity,
  animationType,
}: PopupProps) => {
  const target = useRef(null);
  const container = useRef(null);
  const [layout, setLayout] = useState<NativeMeasureLayout>();
  const [containerPosition, setContainerPosition] = useState({ top, left });

  // useLayoutEffect doesnt seems to work,
  // and the onLayout callback does not give me the correct "y"
  // (it's based on parent component, not in the whole window)
  const calculateLayout = useCallback(() => {
    target.current.measureInWindow((x, y, width, height) => setLayout({ x, y, width, height }));
  }, [target]);

  const repositionContainerWhenOutOfScreen = () => {
    if (containerPosition.top !== top || containerPosition.left !== left) return;
    container.current.measureInWindow((x, y, width, height) => {
      const shouldBeOnTop = y + height >= Dimensions.get('window').height;
      const shouldBeOnRight = x + width >= Dimensions.get('window').width;
      setContainerPosition({ top: shouldBeOnTop, left: !shouldBeOnRight });
    });
  };

  const position = `${containerPosition.top ? 'Bottom' : 'Top'}${
    containerPosition.left ? 'Right' : 'Left'
  }`; // if it's left the pointy thingy is in the right etc...

  return !isOpen ? (
    <View ref={target} onLayout={calculateLayout}>
      {trigger}
    </View>
  ) : (
    <BluryOverlay onPressOut={onPressOut} intensity={blurIntensity} animationType={animationType}>
      <Position x={layout.x} y={layout.y}>
        {openTrigger}
      </Position>
      <Position
        left={containerPosition.left}
        top={containerPosition.top}
        width={layout.width}
        x={layout.x}
        y={layout.y + (containerPosition.top ? 0 : layout.height)}
      >
        <View ref={container} onLayout={repositionContainerWhenOutOfScreen}>
          <Card style={{ paddingVertical: 10, width: 'auto', [`border${position}Radius`]: 5 }}>
            {children}
          </Card>
        </View>
      </Position>
    </BluryOverlay>
  );
};

export default Popup;
