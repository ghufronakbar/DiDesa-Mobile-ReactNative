import axiosInstance from "utils/axiosInstance";

const getAllUMKM = async (limit: number) => {
  const response = await axiosInstance.get("/umkm", {
    params: {
      limit,
    },
  });
  return response.data;
};

const getDetailUMKM = async (umkmId: string) => {
  const response = await axiosInstance.get(`/umkm/${umkmId}`);
  return response.data;
};

export { getAllUMKM, getDetailUMKM };
