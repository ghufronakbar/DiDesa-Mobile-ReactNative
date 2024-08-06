import { useFocusEffect } from "@react-navigation/native";
import BackButton from "Components/BackButton";
import ListPengaduan from "Components/ListPengaduan";
import RenderSkeletonList from "Components/RenderSkeletonList";
import color from "Constants/Color";
import NOT_FOUND from "Constants/NotFound";
import { Pengaduan } from "Models/Pengaduan";
import { useCallback, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getRiwayatPengaduan } from "Services/pengaduan";
import textStyles from "Styles/textStyles";

const RiwayatPengaduanScreen = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getRiwayatPengaduan();
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        }}
      >
        <BackButton navigation={navigation} />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Text style={textStyles.heading}>Riwayat Pengaduan</Text>
        </View>
      </View>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <View>
            {isLoading ? (
              <RenderSkeletonList count={3} />
            ) : data.length === 0 ? (
              <View style={{ position: "relative", height: "100%" }}>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 150,
                    height: "100%",
                  }}
                >
                  <Image
                    source={{ uri: NOT_FOUND }}
                    style={{ width: "100%", height: "20%" }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Tidak ada riwayat pengaduan
                  </Text>
                </View>
              </View>
            ) : (
              data &&
              data.map((item: Pengaduan, index: number) => (
                <ListPengaduan
                  key={index}
                  pengaduanMasyarakatId={item.pengaduanMasyarakatId.toString()}
                  subjek={item.subjek}
                  isi={item.isi}
                  foto={item.foto}
                  tanggal={item.tanggal}
                  navigation={navigation}
                />
              ))
            )}
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
    minHeight: Dimensions.get("window").height,
  },
});

export default RiwayatPengaduanScreen;
