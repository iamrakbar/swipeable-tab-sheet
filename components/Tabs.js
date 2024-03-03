import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useAnimatedRef,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import Tab from './Tab';

import { SPACING, WIDTH, BUTTON_WIDTH } from '../utils/config';

const Tabs = ({ data, scrollX, onItemPress }) => {
  const aRef = useAnimatedRef();
  const insets = useSafeAreaInsets();

  const fullWidth = WIDTH * 2 + SPACING * 2;
  const halfWidth = WIDTH / 2;

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = Math.round(
      interpolate(
        scrollX.value,
        [0, fullWidth / 2, fullWidth],
        [
          (halfWidth - BUTTON_WIDTH / 2 - BUTTON_WIDTH) / 2,
          halfWidth - BUTTON_WIDTH / 2,
          WIDTH - (halfWidth - BUTTON_WIDTH / 2 + BUTTON_WIDTH) / 2,
        ],
        Extrapolate.CLAMP
      )
    );
    return {
      transform: [
        {
          translateX,
        },
      ],
    };
  });

  return (
    <View style={[styles.navbar, { marginTop: insets.top + SPACING }]}>
      <Animated.View ref={aRef} style={[styles.indicator, animatedStyle]} />
      {data.map((item, index) => (
        <Tab
          key={index.toString()}
          id={item.id}
          label={item.label}
          icon={item.icon}
          onItemPress={() => onItemPress(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: WIDTH,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.24)',
    width: BUTTON_WIDTH,
    height: 32,
    borderRadius: 16,
  },
});

export default Tabs;
