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
  return response.data;
};

export { getBeritaPrioritas, getBerita, getUMKM, getProfile };
