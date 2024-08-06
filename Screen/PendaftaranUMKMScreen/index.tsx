import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import detailStyles from "Styles/detailStyles";
import inputStyles from "Styles/inputStyles";
import buttonStyles from "Styles/buttonStyles";
import color from "Constants/Color";
import BackButton from "Components/BackButton";
import ModalActionImage from "Components/ModalActionImage";
import compressImage from "utils/compressImage";
import { ImageResult } from "expo-image-manipulator";
import DEFAULT_IMAGE from "Constants/DefaultImage";
import { JenisUMKM } from "Models/JenisUMKM";
import { getJenisUmkm, registerUMKM } from "Services/umkm";
import ToastNotification from "Components/ToastNotification";
import { ApiError } from "Models/ApiError";
import SpinnerLoading from "Components/SpinnerLoading";

const PendaftaranUMKMScreen = ({ navigation }: any) => {
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>(DEFAULT_IMAGE);
  const [jenis, setJenis] = useState<JenisUMKM[] | null>(null);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  interface DataForm {
    nama: string;
    lokasi: string;
    deskripsi: string;
    jenisUmkm: number;
    gambar: ImageResult | null;
  }

  const [dataForm, setDataForm] = useState<DataForm>({
    nama: "",
    lokasi: "",
    deskripsi: "",
    jenisUmkm: 0,
    gambar: null,
  });

  const fetchData = async () => {
    try {
      const response = await getJenisUmkm();
      setJenis(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePickGallery = async () => {
    console.log(dataForm);
    console.log(selectedImage);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const compressedImage = await compressImage(result.assets[0].uri);
        setDataForm({ ...dataForm, gambar: compressedImage });
        setSelectedImage(result.assets[0].uri);
      } catch (error) {
        console.log(error);
      } finally {
        setIsUploadImage(false);
      }
    }
  };

  const handlePickCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const compressedImage = await compressImage(result.assets[0].uri);
        setDataForm({ ...dataForm, gambar: compressedImage });
        setSelectedImage(result.assets[0].uri);
      } catch (error) {
        console.log(error);
      } finally {
        setIsUploadImage(false);
      }
    }
  };

  const handleTextChange = useCallback(
    (key: keyof DataForm, value: string | number) => {
      setDataForm((prevDataForm) => ({
        ...prevDataForm,
        [key]: value,
      }));
    },
    []
  );

  const handleRegister = async () => {
    console.log({ dataFormgambar: dataForm.gambar });
    if (dataForm.gambar === null) {
      setMessage("Gambar harus diisi");
      setIsError(true);
      setIsToastOpen(true);
      return;
    }
    if (dataForm.jenisUmkm === 0) {
      setMessage("Jenis UMKM harus dipilih");
      setIsError(true);
      setIsToastOpen(true);
      return;
    }
    if (
      dataForm.nama === "" ||
      dataForm.lokasi === "" ||
      dataForm.deskripsi === ""
    ) {
      setMessage("Semua kolom harus diisi");
      setIsError(true);
      setIsToastOpen(true);
      return;
    }
    try {
      setIsLoading(true);
      await registerUMKM(
        dataForm.nama,
        dataForm.deskripsi,
        dataForm.lokasi,
        dataForm.jenisUmkm.toString(),
        dataForm.gambar
      );
      setIsLoading(false);
      setIsError(false);
      setMessage("Pendaftaran berhasil, tunggu konfirmasi dari admin");
      setIsToastOpen(true);      
      setDataForm({
        nama: "",
        lokasi: "",
        deskripsi: "",
        jenisUmkm: 0,
        gambar: null,
      })
      setSelectedImage(DEFAULT_IMAGE);
      setTimeout(() => navigation.goBack(), 2000);
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      setIsError(true);
      setMessage(
        apiError?.response?.data?.message || "Gagal mendaftarkan UMKM"
      );
      setIsToastOpen(true);
    }
  };

  return (
    <SafeAreaView style={detailStyles.container}>
      {isToastOpen && (
        <ToastNotification
          message={message}
          onClose={() => setIsToastOpen(false)}
          status={isError ? "error" : "info"}
        />
      )}
      {isLoading && <SpinnerLoading/>}
      <ModalActionImage
        isVisible={isUploadImage}
        onClose={() => {
          setIsUploadImage(false);
        }}
        onCamera={handlePickCamera}
        onGallery={handlePickGallery}
        title="Unggah Gambar"
        message="Pilih gambar yang ingin diunggah"
      />
      <View style={detailStyles.appBar}>
        <View style={detailStyles.wrapperHeader}>
          <BackButton navigation={navigation} />
          <Text style={detailStyles.header}>Pendaftaran UMKM</Text>
        </View>
      </View>

      <ScrollView style={[containerStyles.container, { gap: 8 }]}>
        <View
          style={[inputStyles.inputContainer, { alignItems: "flex-start" }]}
        >
          <Image
            source={{ uri: selectedImage }}
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
          <TouchableOpacity
            style={[
              buttonStyles.primary,
              {
                paddingVertical: 8,
                paddingHorizontal: 8,
                marginTop: 8,
                alignSelf: "flex-end",
              },
            ]}
            onPress={() => {
              setIsUploadImage(true);
            }}
          >
            <Text style={[buttonStyles.textPrimary, { fontSize: 12 }]}>
              Unggah Gambar
            </Text>
          </TouchableOpacity>
        </View>
        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>Nama UMKM</Text>
          <TextInput
            style={inputStyles.input}
            placeholder="Masukkan Nama UMKM"
            placeholderTextColor={color.gray}
            value={dataForm.nama}
            onChangeText={(text) => handleTextChange("nama", text)}
          />
        </View>
        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>Deskripsi</Text>
          <TextInput
            style={[inputStyles.input, { height: 100 }]}
            placeholder="Masukkan Deskripsi"
            placeholderTextColor={color.gray}
            multiline
            numberOfLines={5}
            value={dataForm.deskripsi}
            onChangeText={(text) => handleTextChange("deskripsi", text)}
          />
        </View>
        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>Lokasi</Text>
          <TextInput
            style={inputStyles.input}
            placeholder="Masukkan Lokasi UMKM"
            placeholderTextColor={color.gray}
            value={dataForm.lokasi}
            onChangeText={(text) => handleTextChange("lokasi", text)}
          />
        </View>
        <TouchableOpacity style={inputStyles.inputContainer}>
          <Text style={inputStyles.label}>Jenis UMKM</Text>
          <TextInput
            style={inputStyles.input}
            placeholder="Pilih Jenis UMKM"
            placeholderTextColor={color.gray}
            editable={false}
            value={
              jenis?.find((item) => item.jenisUmkmId == dataForm.jenisUmkm)
                ?.namaJenisUmkm
            }
            onPress={() => {
              jenis == null ? null : setIsPickerOpen(!isPickerOpen);
            }}
          />
        </TouchableOpacity>
        {isPickerOpen && (
          <>
            <TouchableOpacity
              style={[
                buttonStyles.primary,
                {
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  marginTop: 8,
                  alignSelf: "flex-end",
                },
              ]}
              onPress={() => {
                setIsPickerOpen(false);
              }}
            >
              <Text style={[buttonStyles.textPrimary, { fontSize: 12 }]}>
                Pilih
              </Text>
            </TouchableOpacity>
            <Picker
              selectedValue={dataForm.jenisUmkm}
              onValueChange={(itemValue, itemIndex) =>
                handleTextChange("jenisUmkm", itemValue)
              }
            >
              {jenis != null &&
                jenis.map((item) => (
                  <Picker.Item
                    key={item.jenisUmkmId}
                    label={item.namaJenisUmkm}
                    value={item.jenisUmkmId}
                  />
                ))}
            </Picker>
          </>
        )}
        <TouchableOpacity
          style={[
            buttonStyles.primary,
            { width: "30%", alignSelf: "center", marginVertical: 16 },
          ]}
          onPress={handleRegister}
        >
          <Text style={buttonStyles.textPrimary}>Daftar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: color.white,
  },
});

export default PendaftaranUMKMScreen;
