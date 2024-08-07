import React from "react";
import LoginScreen from "Screen/LoginScreen";
import HomeScreen from "Screen/HomeScreen";
import BeritaScreen from "Screen/BeritaScreen";
import UMKMScreen from "Screen/UMKMScreen";
import DetailBeritaScreen from "Screen/DetailBeritaScreen";
import DetailUMKMScreen from "Screen/DetailUMKMScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "Screen/ProfileScreen";
import UMKMSayaScreen from "Screen/UMKMSayaScreen";
import RiwayatPengaduanScreen from "Screen/RiwayatPengaduanScreen";
import DetailPengaduanScreen from "Screen/DetailPengaduanScreen";
import PendaftaranUMKMScreen from "Screen/PendaftaranUMKMScreen";
import EditUMKMScreen from "Screen/EditUMKMScreen";
import PengaduanScreen from "Screen/PengaduanScreen";
import InformasiDesaScreen from "Screen/InformasiDesaScreen";
import SplashScreen from "Screen/SplashScreen";


const Stack = createNativeStackNavigator();


export default function App() {
  return (    
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Berita" component={BeritaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UMKM" component={UMKMScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PendaftaranUMKM" component={PendaftaranUMKMScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UMKMSaya" component={UMKMSayaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditUMKM" component={EditUMKMScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailBerita" component={DetailBeritaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailUMKM" component={DetailUMKMScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Pengaduan" component={PengaduanScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RiwayatPengaduan" component={RiwayatPengaduanScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailPengaduan" component={DetailPengaduanScreen} options={{ headerShown: false }} />
          <Stack.Screen name="InformasiDesa" component={InformasiDesaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}
