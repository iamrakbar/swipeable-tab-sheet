import { Dimensions } from 'react-native';

export const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export const SPACING = 8;

export const SPRING_CONFIG = {
  damping: 10,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 900,
};

export const BUTTON_WIDTH = 108;

export const NAVIGATIONS = [
  {
    id: 0,
    label: 'Promo',
    icon: 'brightness-percent',
  },
  {
    id: 1,
    label: 'Beranda',
    icon: 'home',
  },
  {
    id: 2,
    label: 'Chat',
    icon: 'chat',
  },
];
