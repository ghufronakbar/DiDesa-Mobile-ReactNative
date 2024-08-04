import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "Screen/SplashScreen";
import LoginScreen from "Screen/LoginScreen";
import HomeScreen from "Screen/HomeScreen";
import BeritaScreen from "Screen/BeritaScreen";
import UMKMScreen from "Screen/UMKMScreen";
import DetailBeritaScreen from "Screen/DetailBeritaScreen";
import DetailUMKMScreen from "Screen/DetailUMKMScreen";
import SpinnerLoading from "Components/SpinnerLoading";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "Screen/ProfileScreen";
import UMKMSayaScreen from "Screen/UMKMSayaScreen";


const Stack = createNativeStackNavigator();


export default function App() {
  return (    
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Berita" component={BeritaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UMKM" component={UMKMScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UMKMSaya" component={UMKMSayaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailBerita" component={DetailBeritaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailUMKM" component={DetailUMKMScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}
