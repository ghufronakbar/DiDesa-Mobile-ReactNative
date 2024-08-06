import React, { useCallback, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import detailStyles from 'Styles/detailStyles';
import inputStyles from 'Styles/inputStyles';
import buttonStyles from 'Styles/buttonStyles';
import color from 'Constants/Color';
import BackButton from 'Components/BackButton';
import ModalActionImage from 'Components/ModalActionImage';
import compressImage from 'utils/compressImage';
import { ImageResult } from 'expo-image-manipulator';
import DEFAULT_IMAGE from 'Constants/DefaultImage';
import { createPengaduan } from 'Services/pengaduan';
import { ApiError } from 'Models/ApiError';
import ToastNotification from 'Components/ToastNotification';
import SpinnerLoading from 'Components/SpinnerLoading';

const PengaduanScreen = ({ navigation }: any) => {  
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>(DEFAULT_IMAGE);
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  interface DataForm {
    subjek: string;    
    isi: string;    
    foto: ImageResult | null;
  }
  
  const [dataForm, setDataForm] = useState<DataForm>({
    subjek: '',    
    isi: '',    
    foto: null,
  });

  const handlePickGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const compressedImage = await compressImage(result.assets[0].uri);
        setDataForm({ ...dataForm, foto: compressedImage });
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
        setDataForm({ ...dataForm, foto: compressedImage });
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

  const handleSend = async () => {         
    if (
      dataForm.subjek === "" ||
      dataForm.isi === "" 
    ) {
      setMessage("Semua kolom harus diisi");
      setIsError(true);
      setIsToastOpen(true);
      return;
    }
    try {
      setIsLoading(true);
      await createPengaduan(
       dataForm.subjek, dataForm.isi, dataForm.foto
      );
      setIsLoading(false);
      setIsError(false);
      setMessage("Pengaduan berhasil dikirim");
      setIsToastOpen(true);      
      setDataForm({
        subjek: "",
        isi: "",       
        foto: null,
      })
      setSelectedImage(DEFAULT_IMAGE);
      setTimeout(() => navigation.goBack(), 2000);
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      setIsError(true);
      setMessage(
        apiError?.response?.data?.message || "Gagal mengirim pengaduan"
      );
      setIsToastOpen(true);
      setIsLoading(false);
    }
  };

  const handleLongText = () => {
    setMessage("Isi Aduan Maksimal 200 karakter") 
    setIsError(true)
    setIsToastOpen(true)
  }

  return (
    <SafeAreaView style={detailStyles.container}>
        {isToastOpen && (
            <ToastNotification message={message} onClose={() => setIsToastOpen(false)} status={isError ? "error" : "info"} />
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
          <Text style={detailStyles.header}>Pengaduan Masyarakat</Text>
        </View>
      </View>   
            <ScrollView style={[containerStyles.container,{ gap: 8 }]}>
              <View style={[inputStyles.inputContainer, { alignItems: 'flex-start' }]}>
                <Image source={{ uri: selectedImage }} style={{ width: '100%', height: 200, borderRadius: 8 }} />
                <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={[inputStyles.label, { fontSize: 12 }]}>*Opsional</Text>
                <TouchableOpacity
                  style={[buttonStyles.primary,{paddingVertical: 8, paddingHorizontal: 8,}]}
                  onPress={() => { setIsUploadImage(true); }}
                >
                  <Text style={[buttonStyles.textPrimary, { fontSize: 12 }]}>Tambahkan Foto</Text>
                </TouchableOpacity>

                </View>
              </View>
              <View style={inputStyles.inputContainer}>
                <Text style={inputStyles.label}>Subjek Aduan</Text>
                <TextInput
                  style={inputStyles.input}
                  placeholder="Masukkan Subjek Aduan"
                  placeholderTextColor={color.gray}
                  value={dataForm.subjek}
                  onChangeText={(text) => handleTextChange('subjek', text)}
                />
              </View>
              <View style={inputStyles.inputContainer}>
                <Text style={inputStyles.label}>Isi Aduan</Text>
                <TextInput
                  style={[inputStyles.input, { height: 100 }]}
                  placeholder="Masukkan Isi Aduan"
                  placeholderTextColor={color.gray}
                  multiline
                  numberOfLines={5}
                  value={dataForm.isi}
                  onChangeText={(text) => handleTextChange('isi', text)}
                />
                <Text style={{ fontSize: 10, color: dataForm.isi.length > 200 ? "red" : color.primary, alignSelf: 'flex-end', marginRight: 8, marginTop: 4 }}>{dataForm.isi.length}/200</Text>
              </View>             
            
              <TouchableOpacity
                style={[buttonStyles.primary, { width: '30%', alignSelf: 'center', marginVertical: 16 }]}
                onPress={()=>{dataForm.isi.length > 200 ? handleLongText() : handleSend()}}
              >
                <Text style={buttonStyles.textPrimary}>Kirim</Text>
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

export default PengaduanScreen;
