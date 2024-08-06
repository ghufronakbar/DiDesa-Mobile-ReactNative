import color from "Constants/Color";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import textStyles from "Styles/textStyles";
import RenderCardUMKM from "Components/RenderCardUMKM";
import { getAllUMKM } from "Services/umkm";
import RenderSkeletonCard from "Components/RenderSkeletonCard";
import BackButton from "Components/BackButton";
import { useFocusEffect } from "@react-navigation/native";

const UMKMScreen = ({ navigation }: { navigation: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [limit, setLimit] = useState<number>(10);
  const [dataLength, setDataLength] = useState({
    currentData: 0,
    totalData: 0,
  });
  const fetchData = async () => {
    setIsLoading(true);
    const response = await getAllUMKM(limit);
    setData(response.data);
    setDataLength(response.dataLength);
    setIsLoading(false);
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
          <Text style={textStyles.heading}>UMKM</Text>
        </View>
      </View>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <>
            {isLoading ? (
              <RenderSkeletonCard count={4} />
            ) : (
              <RenderCardUMKM data={data} navigation={navigation} />
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

export default UMKMScreen;
