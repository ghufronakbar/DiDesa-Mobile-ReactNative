import color from "Constants/Color";
import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import NavTop from "Components/NavTop";
import BeritaPrioritas from "Sections/Home/BeritaPrioritas";
import ListUMKM from "Sections/Home/ListUMKM";
import ListBerita from "Sections/Home/ListBerita";
import ListMenu from "Sections/Home/ListMenu";
import WelcomeMessage from "Sections/Home/WelcomeMessage";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "Services/profile";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const getIsLoggedIn = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    return isLoggedIn;
  };

  const handleBiometricAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      return Alert.alert(
        "Biometric not supported",
        "Your device does not support biometric authentication."
      );
    }
    const hasBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!hasBiometrics) {
      return Alert.alert(
        "Biometric record not found",
        "Please ensure you have set up biometrics in your device settings."
      );
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autentikasi",
      fallbackLabel: "Masukkan kata sandi",
    });    

    if (result.success) {
    } else {
      await logout();
      navigation.navigate("Login");
      Alert.alert("Autentikasi Gagal", "Silahkan login kembali");
    }
  };

  useEffect(() => {
    getIsLoggedIn().then((value) => {
      if (!value) {
        logout().then(() => navigation.navigate("Login"));
      } else {
        handleBiometricAuth();
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavTop navigation={navigation} />
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <View style={{ gap: 24 }}>
            <WelcomeMessage />
            <BeritaPrioritas navigation={navigation} />
            <ListMenu navigation={navigation} />
            <ListUMKM navigation={navigation} />
            <ListBerita navigation={navigation} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={containerStyles.container}
      />
    </SafeAreaView>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: color.white,
  },
});

export default HomeScreen;
