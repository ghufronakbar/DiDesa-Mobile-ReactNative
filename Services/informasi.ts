import axiosInstance from "utils/axiosInstance";

const getInformasiDesa = async () => {
  const response = await axiosInstance.get("/informasi-desa");
  return response.data;
};

export { getInformasiDesa };
