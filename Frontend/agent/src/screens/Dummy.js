import React from 'react';
import { View, ScrollView, Animated } from 'react-native';

export function Dummy() {
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, 100);
  const headerY = Animated.multiply(diffClampScrollY, -1);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          height: 100,
          width: '100%',
          backgroundColor: 'grey',
          position: 'absolute',
          zIndex: 5,
          top: 0,
          transform: [{ translateY: headerY }],
        }}
      />
      <Animated.ScrollView
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingTop: 100 }}
      >
        <View
          style={{
            height: 500,
            backgroundColor: 'rgba(128, 128, 128, 0.4)',
            marginTop: 10,
          }}
        />
        <View
          style={{
            height: 500,
            backgroundColor: 'rgba(128, 128, 128, 0.4)',
            marginTop: 10,
          }}
        />
        <View
          style={{
            height: 500,
            backgroundColor: 'rgba(128, 128, 128, 0.4)',
            marginTop: 10,
          }}
        />
        <View
          style={{
            height: 500,
            backgroundColor: 'rgba(128, 128, 128, 0.4)',
            marginTop: 10,
          }}
        />
      </Animated.ScrollView>
    </View>
  );
}
