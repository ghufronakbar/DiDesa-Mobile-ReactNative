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
import RenderSkeletonCard from "Components/RenderSkeletonCard";
import { getUmkmSaya } from "Services/profile";
import BackButton from "Components/BackButton";
import { useFocusEffect } from "@react-navigation/native";

const UMKMSayaScreen = ({ navigation }: { navigation: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getUmkmSaya();
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      navigation.navigate("Home");
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
          <Text style={textStyles.heading}>UMKM Saya</Text>
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

export default UMKMSayaScreen;
