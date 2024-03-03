import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from 'react-native-reanimated';

import Background from './components/Background';
import Tabs from './components/Tabs';
import Sheet from './components/Sheet';

import { WIDTH, SPACING, NAVIGATIONS } from './utils/config';

const App = () => {
  const aRef = useAnimatedRef();
  const translationX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  const onItemPress = (itemIndex) => {
    aRef.current.scrollTo({
      x: itemIndex * WIDTH + itemIndex * SPACING,
    });
  };

  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
          <StatusBar style={'light'} />
          <View style={styles.container}>
            <View style={styles.backgroundContainer}>
              <Background />
            </View>
            <Animated.ScrollView
              ref={aRef}
              pagingEnabled
              horizontal
              snapToInterval={WIDTH + SPACING}
              snapToAlignment='start'
              decelerationRate='fast'
              showsHorizontalScrollIndicator={false}
              onScroll={scrollHandler}
              scrollEventThrottle={16}
              style={styles.container}
              contentContainerStyle={{ columnGap: SPACING }}
            >
              {NAVIGATIONS.map((item, index) => (
                <View key={`item_${item.id}`} style={styles.page}>
                  <Sheet title={item.label} />
                </View>
              ))}
            </Animated.ScrollView>
          </View>
          <Tabs
            data={NAVIGATIONS}
            onItemPress={onItemPress}
            scrollX={translationX}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#0ebbce',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 32,
  },
  page: {
    flex: 1,
    width: WIDTH,
    height: '100%',
  },
});

export default App;
