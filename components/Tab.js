import { forwardRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { BUTTON_WIDTH } from '../utils/config';

const Tab = forwardRef(({ label, icon, onItemPress }, ref) => {
  return (
    <Pressable onPress={onItemPress}>
      <View style={styles.tab} ref={ref}>
        <Icon name={icon} size={24} color='white' />
        <Text style={styles.tabText}>{label}</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  tab: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: BUTTON_WIDTH,
    height: 32,
    borderRadius: 16,
  },
  tabText: {
    marginLeft: 4,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Tab;
