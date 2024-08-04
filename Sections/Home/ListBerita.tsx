import color from "Constants/Color";
import { Text, View } from "react-native";
import textStyles from "Styles/textStyles";
import React, { useEffect, useState } from "react";
import RenderCardBerita from "Components/RenderCardBerita";
import { getBerita } from "Services/homepage";
import RenderSkeletonCard from "Components/RenderSkeletonCard";

const ListBerita = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getBerita();
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ gap: 16 }}>
      <View
        style={{
          gap: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={textStyles.titleMenu}>Berita</Text>
        <Text
          style={{ color: color.primary }}
          onPress={() => {
            navigation.navigate("Berita");
          }}
        >
          Lihat Semua
        </Text>
      </View>
      {isLoading ? (
        <RenderSkeletonCard count={2} />
      ) : (
        <RenderCardBerita data={data} navigation={navigation} />
      )}
    </View>
  );
};

export default ListBerita;
