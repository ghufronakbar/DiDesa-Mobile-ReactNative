import color from "Constants/Color";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ListMenu = ({ navigation }: { navigation: any }) => {
  return (
    <View
      style={{
        gap: 16,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <View style={menuStyles.wrapper}>
        <TouchableOpacity style={menuStyles.iconWrap} onPress={() => navigation.navigate('InformasiDesa')}>
          <Entypo name="info" size={30} color={color.primary} />
        </TouchableOpacity>
        <Text style={menuStyles.menuName}>Informasi Desa</Text>
      </View>
      <View style={menuStyles.wrapper}>
        <TouchableOpacity style={menuStyles.iconWrap} onPress={() => navigation.navigate('PendaftaranUMKM')}>
          <Entypo name="shop" size={30} color={color.primary} />
        </TouchableOpacity>
        <Text style={menuStyles.menuName}>Pendaftaran UMKM</Text>
      </View>
      <View style={menuStyles.wrapper}>
        <TouchableOpacity style={menuStyles.iconWrap} onPress={() => navigation.navigate('Pengaduan')}>
          <Ionicons
            name="document-text-outline"
            size={30}
            color={color.primary}
          />
        </TouchableOpacity>
        <Text style={menuStyles.menuName}>Pengaduan Masyarakat</Text>
      </View>
      <View style={menuStyles.wrapper}>
        <TouchableOpacity style={menuStyles.iconWrap} onPress={() => navigation.navigate('Pemilihan')}>
          <MaterialCommunityIcons
            name="vote-outline"
            size={30}
            color={color.primary}
          />
        </TouchableOpacity>
        <Text style={menuStyles.menuName}>Pemilihan Kepala Desa</Text>
      </View>
    </View>
  );
};

export const menuStyles = StyleSheet.create({
  iconWrap: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "relative",
  },
  wrapper: { gap: 12, flexDirection: "column", alignItems: "center", flex: 1 },
  menuName: {
    fontSize: 14,
    color: color.tertiary,
    textAlign: "center",
  },
  badges: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: color.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListMenu;
