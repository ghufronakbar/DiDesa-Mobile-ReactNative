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
import Toast from "react-native-toast-message";
import { editUMKM, getDetailUMKM } from "Services/umkm";
import SpinnerLoading from "Components/SpinnerLoading";
import { ApiError } from "Models/ApiError";
import ToastNotification from "Components/ToastNotification";

const EditUMKMScreen = ({ navigation, route }: any) => {
  const { umkmId } = route.params;  
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>(DEFAULT_IMAGE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  interface DataForm {
    nama: string;
    lokasi: string;
    deskripsi: string;
    jenisUmkm: string;
    gambar: ImageResult | null;
  }

  const [dataForm, setDataForm] = useState<DataForm>({
    nama: "",
    lokasi: "",
    deskripsi: "",
    jenisUmkm: "",
    gambar: null,
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getDetailUMKM(umkmId);      
      setDataForm({
        ...dataForm,
        nama: response.data.nama,
        lokasi: response.data.lokasi,
        deskripsi: response.data.deskripsi,
        jenisUmkm: response.data.jenisUmkm.namaJenisUmkm,
      })
      setSelectedImage(response.data.gambar);    
      setIsLoading(false);  
    } catch (error) {
      console.log(error);      
    }
  }

  const handleEdit = async () => {
    if(dataForm.nama === "" || dataForm.lokasi === "" || dataForm.deskripsi === "") {
      setIsError(true);
      setMessage("Mohon lengkapi semua kolom");
      setIsToastOpen(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await editUMKM(umkmId,dataForm.nama,dataForm.deskripsi,dataForm.lokasi,dataForm.gambar);
      setIsError(false);
      setMessage(response.message);
      setIsToastOpen(true);
      setIsLoading(false);      
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      setIsError(true);
      setMessage(
        apiError?.response?.data?.message || "Gagal mengedit UMKM"
      );
      setIsToastOpen(true);      
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handlePickGallery = async () => {
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

  const handleTextChange = useCallback((key: keyof DataForm, value: string) => {
    setDataForm((prevDataForm) => ({
      ...prevDataForm,
      [key]: value,
    }));
  }, []);

  if(isLoading){return <SpinnerLoading/>}

  return (
    <SafeAreaView style={detailStyles.container}>
      {isToastOpen && (
        <ToastNotification message={message} onClose={() => setIsToastOpen(false)} status={isError ? "error" : "info"} />
      )}
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
          <Text style={detailStyles.header}>Edit UMKM</Text>
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
              Ganti Gambar
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
            value={dataForm.jenisUmkm}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            buttonStyles.primary,
            { width: "30%", alignSelf: "center", marginVertical: 16 },
          ]}
          onPress={handleEdit}
        >
          <Text style={buttonStyles.textPrimary}>Simpan</Text>
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

export default EditUMKMScreen;
