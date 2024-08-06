import ModalConfirmation from "Components/ModalConfirmation";
import color from "Constants/Color";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import detailStyles from "Styles/detailStyles";
import textStyles from "Styles/textStyles";
import formatDate from "utils/formatDate";
import { useEffect, useState } from "react";
import { deletePengaduan, getDetailPengaduan } from "Services/pengaduan";
import SpinnerLoading from "Components/SpinnerLoading";
import ToastNotification from "Components/ToastNotification";
import BackButton from "Components/BackButton";
const DetailPengaduanScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const { pengaduanMasyarakatId } = route.params;
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getDetailPengaduan(pengaduanMasyarakatId);
    setData(response.data);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    try {
      const response = await deletePengaduan(pengaduanMasyarakatId);
      setIsToastOpen(true);
      setIsConfirmOpen(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <SafeAreaView style={detailStyles.container}>
      {isConfirmOpen && (
        <ModalConfirmation
          title="Hapus Pengaduan"
          message="Apakah anda yakin ingin menghapus pengaduan ini?"
          isVisible={isConfirmOpen}
          onConfirm={handleDelete}
          onClose={() => {
            setIsConfirmOpen(false);
          }}
        />
      )}
      {isToastOpen && (
        <ToastNotification
          status="info"
          onClose={() => setIsToastOpen(false)}
          message="Pengaduan telah di hapus"
        />
      )}
      <View style={[detailStyles.appBar, { justifyContent: "space-between" }]}>
        <View style={detailStyles.wrapperHeader}>
          <BackButton navigation={navigation} />
          <Text style={detailStyles.header}>Pengaduan</Text>
        </View>
        <Foundation
          name="page-delete"
          size={24}
          color="black"
          onPress={() => setIsConfirmOpen(true)}
        />
      </View>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <>
            <View
              style={{ gap: 8, minHeight: Dimensions.get("window").height }}
            >
              {data.foto !== null && (
                <Image
                  source={{ uri: data.foto }}
                  style={{ width: "100%", height: 200 }}
                />
              )}
              <Text
                style={{
                  color: "gray",
                  fontWeight: "bold",
                  fontSize: 13,
                  marginTop: 8,
                }}
              >
                {formatDate(data.tanggal)}
              </Text>
              <Text style={textStyles.heading}>{data.subjek}</Text>
              <Text
                style={{
                  color: "gray",
                  fontWeight: "bold",
                  fontSize: 13,
                  marginTop: 8,
                }}
              >
                {data.isi}
              </Text>
              <Text
                style={[
                  textStyles.content,
                  { textAlign: "justify", color: color.black },
                ]}
              ></Text>
              <View style={{ marginBottom: 120 }}></View>
            </View>
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
export default DetailPengaduanScreen;
