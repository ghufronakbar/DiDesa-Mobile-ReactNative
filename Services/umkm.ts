import axiosInstance from "utils/axiosInstance";
import * as ImagePicker from "expo-image-picker";

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

const setStatusUMKM = async (umkmId: string, status: boolean) => {
  const response = await axiosInstance.put(`/umkm/status/${umkmId}`, {
    status,
  });
  return response.data;
};

const getJenisUmkm = async () => {
  const response = await axiosInstance.get("/umkm/jenis");
  return response.data;
};

const registerUMKM = async (
  nama: string,
  deskripsi: string,
  lokasi: string,
  jenisUmkmId: string,
  gambar: ImagePicker.ImagePickerAsset
) => {
  const formData = new FormData();
  formData.append("nama", nama);
  formData.append("deskripsi", deskripsi);
  formData.append("lokasi", lokasi);
  formData.append("jenisUmkmId", jenisUmkmId);
  formData.append("gambar", {
    uri: gambar.uri,
    type: "image/jpeg",
    name: "umkm.jpg",
  } as any);
  console.log("axios");
  console.log({ formData });
  const response = await axiosInstance.post("/umkm", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const editUMKM = async (
  umkmId: string,
  nama: string,
  deskripsi: string,
  lokasi: string,
  gambar: ImagePicker.ImagePickerAsset | null
) => {
  if (gambar != null) {
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("lokasi", lokasi);
    formData.append("gambar", {
      uri: gambar.uri,
      type: "image/jpeg",
      name: "umkm.jpg",
    } as any);
    const response = await axiosInstance.put(`/umkm/${umkmId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } else {
    const response = await axiosInstance.put(`/umkm/${umkmId}`, {
      nama,
      deskripsi,
      lokasi,
    });
    return response.data;
  }
};

const deleteUMKM = async (umkmId: string) => {
  const response = await axiosInstance.delete(`/umkm/${umkmId}`);
  return response.data;
};

export {
  getAllUMKM,
  getDetailUMKM,
  setStatusUMKM,
  getJenisUmkm,
  registerUMKM,
  editUMKM,
  deleteUMKM,
};
