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
import { getLinkForgotPassword } from "Services/profile";

const ForgotPasswordScreen = ({ navigation }: { navigation: any }) => {
  const [nik, setNik] = useState<string>("");  
  const [message, setMessage] = useState<string>("");
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleForgotPassword = async () => {
    if (!nik) {
      setMessage("NIK harus diisi");
      setIsError(true);
      setIsToastOpen(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await getLinkForgotPassword(nik);
      setIsLoading(false);
      setIsError(false);
      setIsToastOpen(true);
      setMessage(response.message);      
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      const apiError = error as ApiError;
      setIsLoading(false);
      setIsError(true);
      setIsToastOpen(true);
      setMessage(apiError?.response?.data?.message || "Gagal mengirim link verifikasi");
    }
  };

  return (
    <SafeAreaView style={containerStyles.container}>
      {isToastOpen && (
        <ToastNotification
          message={message}
          status={isError ? "error" : "info"}
          onClose={() => setIsToastOpen(false)}
        />
      )}
      {isLoading && <SpinnerLoading />}
      <ScrollView style={{ alignSelf: "center", paddingTop: 100 }}>
        <View style={{ gap: 16, marginBottom: 32 }}>
          <Text style={textStyles.heading}>Lupa Password</Text>
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
          <TouchableOpacity
            style={[buttonStyles.primary, { flex: 1, width: "45%", alignSelf: "center", marginTop: 32 }]}
            onPress={handleForgotPassword}
          >
            <Text style={buttonStyles.textPrimary}>Kirim Verifikasi</Text>
          </TouchableOpacity>
        
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

export default ForgotPasswordScreen;
