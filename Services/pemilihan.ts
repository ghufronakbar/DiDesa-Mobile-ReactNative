import axiosInstance from "utils/axiosInstance";

const getLatestPemilihan = async () => {
  const response = await axiosInstance.get("/pemilihan/latest");
  return response.data;
};

const doVote = async (calonKetuaId: number) => {
  const response = await axiosInstance.post("/pemilihan", {
    calonKetuaId,
  });
  return response.data;
};

export { getLatestPemilihan, doVote };
