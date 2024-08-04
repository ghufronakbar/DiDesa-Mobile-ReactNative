import color from 'Constants/Color';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const SpinnerLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    zIndex: 100,
  },
});

export default SpinnerLoading;
