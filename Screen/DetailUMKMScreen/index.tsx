import color from "Constants/Color";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import textStyles from "Styles/textStyles";
import { dataBerita, detailBerita, detailUMKM } from "dummy/dummyData";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { getDetailUMKM } from "Services/umkm";
import SpinnerLoading from "Components/SpinnerLoading";

const DetailUMKMScreen = ({ route }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();

  const { umkmId } = route.params;

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getDetailUMKM(umkmId);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, minHeight: Dimensions.get("window").height }}
    >
      <View
        style={{
          backgroundColor: color.white,
          width: Dimensions.get("window").width,
          height: 70,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          elevation: 5,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Ionicons name="chevron-back-sharp" size={24} color={color.black} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <Text style={textStyles.heading}>Detail</Text>
          </View>
        </View>
        {data.isEditable === true ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={24}
              color="black"
            />
            {data.approve === true ? (
              <MaterialIcons
                name={data.status === true ? "public" : "public-off"}
                size={24}
                color="black"
              />
            ) : null}
          </View>
        ) : null}
      </View>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <View style={{ gap: 8, minHeight: Dimensions.get("window").height }}>
            <View style={{ flexDirection: "column", gap: 16, width: "100%" }}>
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
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Entypo name="location-pin" size={20} color={color.primary} />
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
