import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import color from "Constants/Color";
import { getBeritaPrioritas } from "Services/homepage";
import SpinnerLoading from "Components/SpinnerLoading";
import { Berita } from "Models/Berita";
import RenderSkeletonCard, {
  SkeletonCard,
} from "Components/RenderSkeletonCard";

const BeritaPrioritas = ({ navigation }: { navigation: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getBeritaPrioritas();
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {isLoading ? (
        <View
          style={{
            width: Dimensions.get("window").width * 0.9,
            height: 200,
            marginVertical: 6,
          }}
        >
          <SpinnerLoading />
        </View>
      ) : (
        data &&
        data.map((item: Berita) => (
          <TouchableOpacity
            key={item.beritaId}
            onPress={() =>
              navigation.navigate("DetailBerita", { beritaId: item.beritaId })
            }
          >
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                position: "relative",
                marginRight: 16,
              }}
            >
              <Image
                source={{ uri: item.gambar }}
                style={{
                  height: (Dimensions.get("window").width * 0.9 * 9) / 16,
                  width: Dimensions.get("window").width * 0.9,
                  resizeMode: "cover",
                  borderRadius: 16,

                  shadowColor: color.black,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
              />
              <View
                style={{
                  padding: 16,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: Dimensions.get("window").width * 0.8,
                }}
              >
                <Text
                  style={{
                    color: color.white,
                    fontWeight: "bold",
                    fontSize: 24,
                  }}
                  numberOfLines={1}
                >
                  {item.judul}
                </Text>
                <Text
                  style={{
                    color: color.white,
                    fontWeight: "medium",
                    fontSize: 16,
                  }}
                  numberOfLines={1}
                >
                  {item.subjudul}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default BeritaPrioritas;
