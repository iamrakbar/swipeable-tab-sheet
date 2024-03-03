import { createRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import { HEIGHT, WIDTH } from '../utils/config';

const Background = () => {
  const ref = createRef();

  useEffect(() => {
    ref.current?.play();
  }, []);

  return (
    <LottieView
      ref={ref}
      style={styles.lottie}
      source={require('../assets/animation.json')}
    />
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: WIDTH,
    height: HEIGHT / 2,
  },
});

export default Background;
