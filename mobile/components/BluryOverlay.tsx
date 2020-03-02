import * as React from 'react';
import {
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  ViewStyle,
  ModalBaseProps,
  StyleProp,
} from 'react-native';
import { BlurView } from 'expo-blur';

interface BluryOverlayProps {
  children: React.ReactElement | Array<React.ReactElement>;
  onPressOut: () => void;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  animationType?: ModalBaseProps['animationType'];
}

const BluryOverlay = ({
  children,
  onPressOut,
  intensity = 75,
  animationType = 'none',
  style,
}: BluryOverlayProps) => (
  <Modal transparent visible animationType={animationType}>
    <TouchableWithoutFeedback onPressOut={onPressOut}>
      <BlurView tint="light" intensity={intensity} style={[StyleSheet.absoluteFill, style]}>
        {children}
      </BlurView>
    </TouchableWithoutFeedback>
  </Modal>
);

export default BluryOverlay;
