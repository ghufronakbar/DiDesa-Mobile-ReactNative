import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../../assets/images/logo.png";

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} width={50} height={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;
