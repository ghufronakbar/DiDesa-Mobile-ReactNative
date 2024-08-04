import axiosInstance from "utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

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

const editImageProfile = async (foto: ImagePicker.ImagePickerAsset) => {
  const formData = new FormData();
  formData.append("foto", {
    uri: foto.uri,
    type: "image/jpeg",
    name: "profile.jpg",
  } as any);
  const response = await axiosInstance.put("/account/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const deleteImageProfile = async () => {
  const response = await axiosInstance.delete("/account/profile");
  return response.data;
};

export {
  logout,
  getProfile,
  getUmkmSaya,
  editImageProfile,
  deleteImageProfile,
};
