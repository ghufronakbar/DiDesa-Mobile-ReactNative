import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "utils/axiosInstance";

const getBeritaPrioritas = async () => {
  const response = await axiosInstance.get("/berita", {
    params: {
      q: "prioritas",
    },
  });
  return response.data;
};

const getBerita = async () => {
  const response = await axiosInstance.get("/berita", {
    params: {
      q: "populer",
      limit: 2,
    },
  });
  return response.data;
};

const getUMKM = async () => {
  const response = await axiosInstance.get("/umkm", {
    params: {
      limit: 2,
    },
  });
  return response.data;
};

const getProfile = async () => {
  const response = await axiosInstance.get("/account/profile");
  const getIsLoggedIn = response.data.isLoggedIn;
  const namaLengkap = response.data.data.namaLengkap;
  await AsyncStorage.setItem("isLoggedIn", getIsLoggedIn.toString());
  await AsyncStorage.setItem("name", namaLengkap.toString());
  return response.data;
};

const getInfo = async () => {
  const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
  const name = await AsyncStorage.getItem("name");
  return { isLoggedIn, name };
};

export { getBeritaPrioritas, getBerita, getUMKM, getProfile, getInfo };
