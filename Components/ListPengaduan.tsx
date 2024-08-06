import color from "Constants/Color";
import DEFAULT_IMAGE from "Constants/DefaultImage";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import formatDate from "utils/formatDate";

interface ListPengaduanProps {
  navigation: any;
  pengaduanMasyarakatId: string;
  subjek: string;
  isi: string;
  foto: string | null;
  tanggal: string;
}

const ListPengaduan = ({
  navigation,
  pengaduanMasyarakatId,
  subjek,
  isi,
  foto,
  tanggal,
}: ListPengaduanProps) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailPengaduan", { pengaduanMasyarakatId })}
      style={pengaduanStyles.container}
    >
      <Image
        source={{ uri: foto ? foto : DEFAULT_IMAGE }}
        style={pengaduanStyles.image}
      />
      <View style={pengaduanStyles.innerContainer}>
        <View style={pengaduanStyles.textContainer}>
          <Text style={pengaduanStyles.subjek} numberOfLines={1}>
            {subjek}
          </Text>
          <Text style={pengaduanStyles.date}>{formatDate(tanggal)}</Text>
        </View>
        <Text style={pengaduanStyles.isi} numberOfLines={3}>
          {isi}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const pengaduanStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 16,
    flexDirection: "row",
    gap: 16,
    overflow: "hidden",
    backgroundColor: color.gray2,
    marginBottom: 16,
    padding: 16,
  },
  innerContainer: {
    paddingRight: 16,
    flexDirection: "column",
    gap: 8,
    overflow: "hidden",
    width: "70%",
    height: "100%",
  },
  subjek: { fontSize: 16, fontWeight: "bold", maxWidth: "40%" },
  date: { fontSize: 11 },
  isi: { fontSize: 12 },
  image: { width: 100, height: "100%", borderRadius: 8 },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ListPengaduan;
