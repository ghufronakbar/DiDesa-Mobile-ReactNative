import axiosInstance from "utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("isLoggedIn");
  await AsyncStorage.removeItem("name");
  return true;
};

const getProfile = async () => {
  const response = await axiosInstance.get("/account/profile");
  return response.data;
};

const getUmkmSaya = async () => {
  const response = await axiosInstance.get("/umkm/saya");
  return response.data;
};

export { logout, getProfile, getUmkmSaya };
