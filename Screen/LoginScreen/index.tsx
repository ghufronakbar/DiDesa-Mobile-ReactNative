import SpinnerLoading from "Components/SpinnerLoading";
import ToastNotification from "Components/ToastNotification";
import color from "Constants/Color";
import { ApiError } from "Models/ApiError";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "Services/login";
import buttonStyles from "Styles/buttonStyles";
import inputStyles from "Styles/inputStyles";
import textStyles from "Styles/textStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [nik, setNik] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!nik || !password) {
      setMessage("NIK dan password harus diisi");
      setIsError(true);
      setIsToastOpen(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await login(nik, password);
      console.log(response);
      setIsLoading(false);
      setIsError(false);
      setIsToastOpen(true);
      setMessage(response.message);
      await AsyncStorage.setItem("token", response.token);
      navigation.navigate("Home");
    } catch (error) {
      console.log("error");
      console.log(error);
      const apiError = error as ApiError;      
      setIsLoading(false);
      setIsError(true);
      setIsToastOpen(true);
      setMessage(apiError?.response?.data?.message || "Gagal login");
    }
  };

  return (
    <SafeAreaView style={containerStyles.container}>
      {isToastOpen && <ToastNotification message={message} status={isError?"error":"info"} onClose={() => setIsToastOpen(false)}  />}
        {isLoading && <SpinnerLoading />}
      <ScrollView style={{ alignSelf: "center", paddingTop: 100 }}>
        <View style={{ gap: 16, marginBottom: 68 }}>
          <Text style={textStyles.heading}>Selamat Datang ke</Text>
          <Text style={{ color: color.primary, fontWeight: 800, fontSize: 50 }}>
            DiDesa
          </Text>
          <Text style={textStyles.content}>
            Menghubungkan desa Anda dengan era digital dalam satu aplikasi.
          </Text>
        </View>
        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>NIK</Text>
          <TextInput
            style={inputStyles.input}
            placeholder="Masukkan NIK anda"
            placeholderTextColor={color.gray}
            value={nik}
            onChangeText={setNik}
            keyboardType="number-pad"
          />
        </View>
        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>Password</Text>
          <TextInput
            style={inputStyles.input}
            placeholder="Masukkan password anda"
            placeholderTextColor={color.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row",
            gap: 10,
            marginTop: 16,            
          }}
        >
          <TouchableOpacity
            style={[buttonStyles.primaryOutline, { flex: 1 }]}
            onPress={handleLogin}
          >
            <Text style={buttonStyles.textOutlinePrimary}>Lupa Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[buttonStyles.primary, { flex: 1 }]}
            onPress={handleLogin}
          >
            <Text style={buttonStyles.textPrimary}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: color.white,    
    alignItems: "center",
  },
});

export default LoginScreen;
