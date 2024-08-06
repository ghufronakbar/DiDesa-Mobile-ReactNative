import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const SkeletonList = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#c0c0c0'],
  });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.image, { backgroundColor }]} />
      <View style={styles.textContainer}>
        <Animated.View style={[styles.text, { backgroundColor, width: '40%' }]} />
        <Animated.View style={[styles.text, { backgroundColor, width: '20%' }]} />
      </View>
      <Animated.View style={[styles.text, { backgroundColor, width: '100%', height: 60 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 16,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
    padding: 16,
  },
  image: {
    width: 100,
    height: '100%',
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingRight: 16,
    width: '70%',
    height: '80%',
  },
  text: {
    height: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
});


const RenderSkeletonCard = ({ count }: { count: number }) => {
    const skeletons = Array(count).fill(0);
    return (
      <>
        {skeletons.map((_, index) => (          
            <SkeletonList key={index}/>          
        ))}
      </>
    );
  };

export default RenderSkeletonCard;
