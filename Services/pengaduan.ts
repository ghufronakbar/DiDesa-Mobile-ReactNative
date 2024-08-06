import axiosInstance from "utils/axiosInstance";
import * as ImagePicker from "expo-image-picker";

const getRiwayatPengaduan = async () => {
  const response = await axiosInstance.get("/pengaduan-masyarakat");
  return response.data;
};

const getDetailPengaduan = async (pengaduanMasyarakatId: string) => {
  const response = await axiosInstance.get(
    `/pengaduan-masyarakat/${pengaduanMasyarakatId}`
  );
  return response.data;
};

const deletePengaduan = async (pengaduanMasyarakatId: string) => {
  const response = await axiosInstance.delete(
    `/pengaduan-masyarakat/${pengaduanMasyarakatId}`
  );
  return response.data;
};

const createPengaduan = async (
  subjek: string,
  isi: string,
  foto: ImagePicker.ImagePickerAsset | null
) => {
  if (foto !== null) {
    const formData = new FormData();
    formData.append("subjek", subjek);
    formData.append("isi", isi);
    formData.append("foto", {
      uri: foto.uri,
      type: "image/jpeg",
      name: "pengaduan.jpg",
    } as any);
    const response = await axiosInstance.post(
      "/pengaduan-masyarakat",
      formData
    );
    return response.data;
  } else {
    const response = await axiosInstance.post("/pengaduan-masyarakat", {
      subjek,
      isi,
    });
    return response.data;
  }
};

export {
  getRiwayatPengaduan,
  getDetailPengaduan,
  deletePengaduan,
  createPengaduan,
};
