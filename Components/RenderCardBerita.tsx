import React from "react";
import color from "Constants/Color";
import { Image, StyleSheet, Text, View,FlatList, TouchableOpacity } from "react-native";
import formatDate from "utils/formatDate";
import Octicons from "react-native-vector-icons/Octicons";

const CardBerita = ({
  beritaId,
    judul,
    gambar,
    komentar,
    navigation
  }: {
    beritaId: string;
    judul: string;
    gambar: string;
    komentar: string;
    navigation: any;
  }) => {
    return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailBerita', { beritaId })}>      
      <View style={cardStyles.card}>
        <Image source={{ uri: gambar }} style={cardStyles.image} />
        <Text style={cardStyles.name} numberOfLines={1}>{judul}</Text>
        <View style={cardStyles.badge}>
          <Text style={cardStyles.badgeText}>{komentar}</Text>
          <Octicons name="comment-discussion" size={12} color={color.white} />
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
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    badgeText: {
      fontSize: 12,
      color: color.white,    
    },
  });
  


const RenderCardBerita = ({ data, navigation }: { data: any, navigation: any }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={{ flex: 1, padding: 8 }}>
          <CardBerita judul={item.judul} gambar={item.gambar} komentar={item._count.komentar} beritaId={item.beritaId} navigation={navigation}/>
        </View>
      )}
      keyExtractor={(item) => item.beritaId}
      numColumns={2}
    />
  );
};

export default RenderCardBerita;
