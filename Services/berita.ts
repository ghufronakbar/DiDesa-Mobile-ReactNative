import axiosInstance from "utils/axiosInstance";

const getAllBerita = async (limit: number) => {
  const response = await axiosInstance.get("/berita", {
    params: {
      limit,
    },
  });
  return response.data;
};

const getDetailBerita = async (beritaId: string) => {
  const response = await axiosInstance.get(`/berita/${beritaId}`);
  return response.data;
};

const createKomentar = async (beritaId: string, isi: string) => {
  const response = await axiosInstance.post("/komentar", {
    beritaId: Number(beritaId),
    isi,
  });
  return response.data;
};

const deleteKomentar = async (komentarId: string) => {
  const response = await axiosInstance.delete(`/komentar/${komentarId}`);
  return response.data;
};

export { getAllBerita, getDetailBerita, createKomentar, deleteKomentar };
