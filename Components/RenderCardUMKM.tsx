import React from "react";
import color from "Constants/Color";
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";

const CardUMKM = ({
  umkmId,
  nama,
  gambar,
  jenisUmkm,
  navigation
}: {
  umkmId: string;
  nama: string;
  gambar: string;
  jenisUmkm: string;
  navigation: any;
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailUMKM', { umkmId })}>
      <View style={cardStyles.card}>
        <Image source={{ uri: gambar }} style={cardStyles.image} />
        <Text style={cardStyles.name} numberOfLines={1}>
          {nama}
        </Text>
        <View style={cardStyles.badge}>
          <Text style={cardStyles.badgeText}>{jenisUmkm}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: color.gray2,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    marginHorizontal: 12,
    marginBottom: 22,
  },
  badge: {
    backgroundColor: color.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 12,
    color: color.white,
  },
});
const RenderCardUMKM = ({ data, navigation }: { data: any; navigation: any }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={{ flex: 1, padding: 8 }}>
          <CardUMKM
            umkmId={item.umkmId}
            nama={item.nama}
            gambar={item.gambar}
            jenisUmkm={item.jenisUmkm.namaJenisUmkm}
            navigation={navigation}
          />
        </View>
      )}
      keyExtractor={(item) => item.umkmId}
      numColumns={2}
    />
  );
};

export default RenderCardUMKM;
