import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import color from "Constants/Color";
import textStyles from "Styles/textStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import formatDate from "utils/formatDate";
import Entypo from "react-native-vector-icons/Entypo";
import { menuStyles } from "Sections/Home/ListMenu";
import Copyright from "Components/Copyright";
import SpinnerLoading from "Components/SpinnerLoading";
import {
  deleteImageProfile,
  editImageProfile,
  getProfile,
  logout,
} from "Services/profile";
import ToastNotification from "Components/ToastNotification";
import ModalActionImage from "Components/ModalActionImage";
import compressImage from "utils/compressImage";

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [isLogoutSuccess, setIsLogoutSuccess] = useState<boolean>(false);
  const [isEditImage, setIsEditImage] = useState<boolean>(false);
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState<boolean>(false);
  const [messageUpload, setMessageUpload] = useState<string>("");

  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!cameraPermission.granted || !mediaLibraryPermission.granted) {
        Alert.alert(
          "Permissions required",
          "Camera and Media Library permissions are required to use this feature. Please grant them in your device settings.",
          [{ text: "OK" }]
        );
      }
    })();
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getProfile();
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await deleteImageProfile();
      setMessageUpload(response.message);
      setIsUploadSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditImage(false);
      setIsUploadImage(false);
      fetchData();
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLogoutSuccess(true);
    setIsLoading(false);
    navigation.navigate("Home");
  };

  const handlePickGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsLoading(true);
      try {
        const compressedImage = await compressImage(result.assets[0].uri);
        const response = await editImageProfile(compressedImage);
        setMessageUpload(response.message);
        setIsUploadSuccess(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsEditImage(false);
        setIsUploadImage(false);
        fetchData();
      }
    }
  };

  const handlePickCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsLoading(true);
      try {
        const compressedImage = await compressImage(result.assets[0].uri);
        const response = await editImageProfile(compressedImage);
        setMessageUpload(response.message);
        setIsUploadSuccess(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsEditImage(false);
        setIsUploadImage(false);
        fetchData();
      }
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <SafeAreaView>
      {isLogoutSuccess && (
        <ToastNotification
          status="info"
          message="Berhasil Keluar"
          onClose={() => setIsLogoutSuccess(false)}
        />
      )}
      {isUploadSuccess && (
        <ToastNotification
          status="info"
          message={messageUpload}
          onClose={() => setIsUploadSuccess(false)}
        />
      )}

      <ModalActionImage
        isVisible={isUploadImage}
        onClose={() => {
          setIsUploadImage(false);
        }}
        onCamera={handlePickCamera}
        onGallery={handlePickGallery}
        title="Unggah Foto Profil"
        message="Pilih gambar yang ingin diubah"
      />

      <ModalActionImage
        isVisible={isEditImage}
        onClose={() => {
          setIsEditImage(false);
        }}
        onCamera={handlePickCamera}
        onGallery={handlePickGallery}
        onDelete={handleDelete}
        title="Edit Foto Profil"
        message="Pilih gambar yang ingin diunggah"
      />

      <View style={profileStyles.container}>
        <Text style={{ color: color.primary, fontWeight: "800", fontSize: 42 }}>
          DiDesa
        </Text>
        <TouchableOpacity
          style={{ position: "relative", marginVertical: 16 }}
          onPress={() =>
            data.isPicDeletable === true
              ? setIsEditImage(true)
              : setIsUploadImage(true)
          }
        >
          <Image
            source={{ uri: data.foto }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
          <View style={profileStyles.iconPic}>
            <MaterialIcons
              name={data.isPicDeletable ? "edit" : "add"}
              size={16}
              color={color.white}
            />
          </View>
        </TouchableOpacity>
        <View style={profileStyles.containerDetail}>
          <Text
            style={[
              textStyles.subHeading,
              { fontWeight: "700", alignSelf: "center", marginBottom: 8 },
            ]}
          >
            Detail Akun
          </Text>
          <View style={profileStyles.wrapperDetail}>
            <Ionicons name="person-outline" size={16} color={color.black} />
            <Text style={{ color: color.black }}>{data.namaLengkap}</Text>
          </View>
          <View style={profileStyles.wrapperDetail}>
            <AntDesign name="idcard" size={16} color={color.black} />
            <Text style={{ color: color.black }}>{data.nik}</Text>
          </View>
          <View style={profileStyles.wrapperDetail}>
            <AntDesign name="phone" size={16} color={color.black} />
            <Text style={{ color: color.black }}>+{data.telepon}</Text>
          </View>
          <View style={profileStyles.wrapperDetail}>
            <AntDesign name="calendar" size={16} color={color.black} />
            <Text style={{ color: color.black }}>
              {formatDate(data.tanggalLahir)}
            </Text>
          </View>
        </View>
        <View
          style={{
            gap: 16,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-evenly",
            marginTop: 16,
          }}
        >
          <View style={menuStyles.wrapper}>
            <View style={menuStyles.iconWrap}>
              <MaterialIcons name="password" size={30} color={color.primary} />
            </View>
            <Text style={menuStyles.menuName}>Ganti Password</Text>
          </View>
          <View style={menuStyles.wrapper}>
            <TouchableOpacity style={menuStyles.iconWrap}>
              <Entypo
                name="shop"
                size={30}
                color={color.primary}
                onPress={() => navigation.navigate("UMKMSaya")}
              />
              <View style={menuStyles.badges}>
                <Text style={{ color: color.white, fontWeight: "700" }}>
                  {data._count.umkm}
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={menuStyles.menuName}>UMKM Saya</Text>
          </View>
          <View style={menuStyles.wrapper}>
            <View style={menuStyles.iconWrap}>
              <Ionicons
                name="document-text-outline"
                size={30}
                color={color.primary}
              />
              <View style={menuStyles.badges}>
                <Text style={{ color: color.white, fontWeight: "700" }}>
                  {data._count.pengaduanMasyarakat}
                </Text>
              </View>
            </View>
            <Text style={menuStyles.menuName}>Riwayat Pengaduan</Text>
          </View>
          <View style={menuStyles.wrapper}>
            <TouchableOpacity
              style={menuStyles.iconWrap}
              onPress={handleLogout}
            >
              <MaterialIcons name="logout" size={30} color={color.primary} />
            </TouchableOpacity>
            <Text style={menuStyles.menuName}>Keluar</Text>
          </View>
        </View>
        <Copyright style={{ position: "absolute", bottom: 0 }} />
      </View>
    </SafeAreaView>
  );
};

const profileStyles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: "center",
    gap: 18,
    backgroundColor: color.white,
  },
  containerDetail: {
    flexDirection: "column",
    gap: 12,
    borderRadius: 32,
    padding: 20,
    paddingBottom: 28,
    backgroundColor: color.white,
    width: "100%",
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  wrapperDetail: { flexDirection: "row", gap: 16 },
  iconPic: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: color.primary,
    padding: 4,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;