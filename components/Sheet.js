import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HEIGHT, SPACING, SPRING_CONFIG, WIDTH } from '../utils/config';

const Sheet = ({ title }) => {
  const insets = useSafeAreaInsets();
  const initialHeight = Math.floor(WIDTH + insets.top);
  const closeHeight = Math.floor(insets.top + SPACING * 2);
  const top = useSharedValue(initialHeight);

  const animatedStyle = useAnimatedStyle(() => {
    const position = Math.round(
      interpolate(
        top.value,
        [initialHeight, closeHeight],
        [initialHeight, closeHeight],
        Extrapolate.CLAMP
      )
    );
    return {
      transform: [{ translateY: withSpring(position, SPRING_CONFIG) }],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startTop = top.value;
    },
    onActive: (event, context) => {
      top.value = context.startTop + event.translationY;
    },
    onEnd: () => {
      if (top.value < initialHeight * 0.5) {
        top.value = closeHeight;
      } else {
        top.value = initialHeight;
      }
    },
  });

  return (
    <Animated.View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.sheet, animatedStyle]}>
          <View style={styles.sheetHandler} />
          <View style={styles.sheetContent}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'white',
    height: HEIGHT - StatusBar.currentHeight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  sheetHandler: {
    marginTop: 8,
    width: 24,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
  },
  sheetContent: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 2 * SPACING,
    paddingVertical: 4 * SPACING,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default Sheet;
