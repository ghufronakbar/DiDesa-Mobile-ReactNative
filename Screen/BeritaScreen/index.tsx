import color from "Constants/Color";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import textStyles from "Styles/textStyles";
import RenderCardBerita from "Components/RenderCardBerita";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAllBerita } from "Services/berita";
import RenderSkeletonCard from "Components/RenderSkeletonCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BeritaScreen = ({ navigation }: { navigation: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [limit, setLimit] = useState<number>(20);
  const [dataLength, setDataLength] = useState({
    currentData: 0,
    totalData: 0,
  });
  const fetchData = async () => {
    setIsLoading(true);
    const response = await getAllBerita(limit);
    setData(response.data);
    setDataLength(response.dataLength);
    setIsLoading(false);
  };

  useEffect(() => {
    const token = AsyncStorage.getItem("token");
    console.log(token);
    fetchData();
  }, []);
  
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
        <Ionicons name="chevron-back-sharp" size={24} color={color.black} />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Text style={textStyles.heading}>Berita</Text>
        </View>
      </View>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <>
            {isLoading ? (
              <RenderSkeletonCard count={3} />
            ) : (
              <RenderCardBerita data={data} navigation={navigation} />
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
    minHeight: Dimensions.get("window").height,
  },
});

export default BeritaScreen;
