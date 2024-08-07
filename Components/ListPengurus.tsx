import color from "Constants/Color";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ListPengurusProps {
  pengurusDesaAnggotaId: number;
  nama: string;
  jabatan: string;
  foto: string;
  telepon: string;
}

const ListPengurus = ({
  pengurusDesaAnggotaId,
  nama,
  jabatan,
  foto,
  telepon,
}: ListPengurusProps) => {
  const handlePress = async () => {
    const url = `https://api.whatsapp.com/send?phone=${telepon}`;
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      await Linking.openURL(url);
    } else {
      console.log("error");
    }
  };
  return (
    <TouchableOpacity style={pengurusStyles.container} onPress={handlePress}>
      <Image source={{ uri: foto }} style={pengurusStyles.image} />
      <View style={pengurusStyles.innerContainer}>
        <View style={pengurusStyles.textContainer}>
          <Text style={pengurusStyles.nama} numberOfLines={1}>
            {nama}
          </Text>
        </View>
        <View style={pengurusStyles.badge}>
          <Text style={pengurusStyles.badgeName} numberOfLines={3}>
            {jabatan}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const pengurusStyles = StyleSheet.create({
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
  nama: { fontSize: 18, fontWeight: "bold", maxWidth: "100%" },
  date: { fontSize: 11 },
  isi: { fontSize: 12 },
  image: { width: 100, height: "100%", borderRadius: 8 },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    backgroundColor: color.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  badgeName: { fontSize: 12, color: color.white },
});

export default ListPengurus;
