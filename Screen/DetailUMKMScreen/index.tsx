import color from "Constants/Color";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import textStyles from "Styles/textStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { deleteUMKM, getDetailUMKM, setStatusUMKM } from "Services/umkm";
import SpinnerLoading from "Components/SpinnerLoading";
import ToastNotification from "Components/ToastNotification";
import detailStyles from "Styles/detailStyles";
import BackButton from "Components/BackButton";
import { useFocusEffect } from "@react-navigation/native";
import { ApiError } from "Models/ApiError";
import ModalConfirmation from "Components/ModalConfirmation";

const DetailUMKMScreen = ({ navigation, route }: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const { umkmId } = route.params;

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getDetailUMKM(umkmId);
    setData(response.data);
    setIsLoading(false);
  };

  const handleSetStatus = async (status: boolean) => {
    setIsLoading(true);
    try {
      const response = await setStatusUMKM(umkmId, status);
      setMessage(response.message);
      setIsLoading(false);
      fetchData();
      setIsToastOpen(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsConfirmationOpen(false);
    setIsLoading(true);
    try {
      const response = await deleteUMKM(umkmId);
      setIsConfirmationOpen(false);
      setMessage("Berhasil Menghapus UMKM");
      setIsToastOpen(true);
      setIsLoading(false);
      setTimeout(() => navigation.goBack(), 2000);
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      setMessage(apiError?.response?.data?.message || "Gagal menghapus UMKM");
      setIsToastOpen(true);
      setIsLoading(false);
      setIsConfirmationOpen(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView style={detailStyles.container}>
      {isToastOpen && (
        <ToastNotification
          message={message}
          status="info"
          onClose={() => setIsToastOpen(false)}
        />
      )}
      <ModalConfirmation isVisible={isConfirmationOpen} onClose={()=>setIsConfirmationOpen(false)} onConfirm={handleDelete} title="Hapus UMKM" message="Apakah anda yakin ingin menghapus UMKM ini?" />

      <View style={[detailStyles.appBar, { justifyContent: "space-between" }]}>
        <View style={detailStyles.wrapperHeader}>
          <BackButton navigation={navigation} />
          <Text style={detailStyles.header}>Detail</Text>
        </View>
        {data && data.isEditable === true ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={24}
              color="black"
              onPress={() => navigation.navigate("EditUMKM", { umkmId })}
            />
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color="black"
              onPress={() => {setIsConfirmationOpen(true)}}
            />
            {data && data.approve === true ? (
              <MaterialIcons
                name={data.status === true ? "public" : "public-off"}
                size={24}
                color="black"
                onPress={() => handleSetStatus(!data.status)}
              />
            ) : null}
          </View>
        ) : null}
      </View>
      {isLoading && <SpinnerLoading />}
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <>
            {data && (
              <View
                style={{ gap: 8, minHeight: Dimensions.get("window").height }}
              >
                <View
                  style={{ flexDirection: "column", gap: 16, width: "100%" }}
                >
                  <Text style={textStyles.heading}>{data.nama}</Text>
                  <View
                    style={{
                      backgroundColor: color.primary,
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      alignSelf: "flex-start",
                      borderRadius: 12,
                    }}
                  >
                    <Text style={{ color: color.white, fontSize: 15 }}>
                      {data.jenisUmkm.namaJenisUmkm}
                    </Text>
                  </View>
                </View>
                <Image
                  source={{ uri: data.gambar }}
                  style={{ width: "100%", height: 200, marginTop: 16 }}
                />
                <Text
                  style={[
                    textStyles.content,
                    { textAlign: "justify", color: color.black, marginTop: 16 },
                  ]}
                >
                  {data.deskripsi}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 16,
                    marginTop: 16,
                    borderColor: color.primary,
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 8,
                  }}
                >
                  <Image
                    source={{ uri: data.warga.foto }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                  <View style={{ flexDirection: "column", gap: 2 }}>
                    <Text style={textStyles.subHeading}>
                      {data.warga.namaLengkap}
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Entypo
                        name="location-pin"
                        size={20}
                        color={color.primary}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "400",
                          color: color.tertiary,
                        }}
                      >
                        {" "}
                        {data.lokasi}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={containerStyles.container}
      />
    </SafeAreaView>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: color.white,
  },
});

export default DetailUMKMScreen;
