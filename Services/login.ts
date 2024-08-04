import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "utils/axiosInstance";

const login = async (nik: string, password: string) => {
  const response = await axiosInstance.post("/account/login", {
    nik,
    password,
  });
  
  if(response.status == 200) {
    await AsyncStorage.setItem("isLoggedIn", "true");
    await AsyncStorage.setItem("name", response.data.data.namaLengkap);    
    await AsyncStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export { login };
