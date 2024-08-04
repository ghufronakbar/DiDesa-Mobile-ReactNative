import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const SkeletonCard = () => {
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
      <Animated.View style={[styles.text, { backgroundColor, width: '80%' }]} />
      <Animated.View style={[styles.text, { backgroundColor, width: '50%' }]} />
    </View>
  );
};


const RenderSkeletonCard = ({ count }: { count: number }) => {
  const skeletons = Array(count).fill(0);

  return (
    <View style={styles.grid}>
      {skeletons.map((_, index) => (
        <View style={styles.gridItem} key={index}>
          <SkeletonCard />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
  },
  gridItem: {
    width: '48%',
    marginVertical: 6,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 8,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  text: {
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
});
export {SkeletonCard}
export default RenderSkeletonCard;
