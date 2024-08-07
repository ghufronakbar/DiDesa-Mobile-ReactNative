import BackButton from "Components/BackButton";
import color from "Constants/Color";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import textStyles from "Styles/textStyles";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import DEFAULT_IMAGE from "Constants/DefaultImage";
import ListPengurus from "Components/ListPengurus";
import { useEffect, useState } from "react";
import SpinnerLoading from "Components/SpinnerLoading";
import { InformasiDesa } from "Models/InformasiDesa";
import { getInformasiDesa } from "Services/informasi";
import { PengurusDesa } from "Models/PengurusDesa";

const InformasiDesaScreen = ({ navigation }: any): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  interface Data {
    informasiDesa : InformasiDesa;
    pengurusDesa: PengurusDesa[];
  }
  const [data, setData] = useState<Data | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getInformasiDesa();
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }
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
          <Text style={textStyles.heading}>Informasi Desa</Text>
        </View>
      </View>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <View style={{ gap: 8, minHeight: Dimensions.get("window").height }}>
            <Text style={textStyles.heading}>{data?.informasiDesa.namaDesa}</Text>
            <Text
              style={[
                textStyles.content,
                { textAlign: "justify", color: color.black },
              ]}
            >
              {data?.informasiDesa.deskripsi}
            </Text>
            {data && (
              <QuantityInformation
                luasWilayah={data?.informasiDesa.luasWilayah}
                lahanPertanian={data?.informasiDesa.lahanPertanian}
                lahanPeternakan={data?.informasiDesa.lahanPeternakan}
              />
            )}
            <Text style={[textStyles.heading, { fontSize: 20 }]}>
              Pengurus Desa
            </Text>
            {data &&
              data.pengurusDesa.map((item, index) => (
                <ListPengurus
                  key={index}
                  nama={item.warga.namaLengkap}
                  foto={item.warga.foto}
                  jabatan={item.jabatan}
                  pengurusDesaAnggotaId={item.pengurusDesaAnggotaId}
                  telepon={item.warga.telepon}
                />
              ))}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={containerStyles.container}
      />
    </SafeAreaView>
  );
};

interface QuantityInformationProps {
  luasWilayah: number;
  lahanPertanian: number;
  lahanPeternakan: number;
}

const QuantityInformation = ({
  luasWilayah,
  lahanPertanian,
  lahanPeternakan,
}: QuantityInformationProps) => {
  return (
    <View style={qStyles.container}>
      <View style={qStyles.wrapper}>
        <Entypo name="area-graph" size={50} color={color.primary} />
        <View>
          <Text style={[textStyles.titleMenu, { fontSize: 16 }]}>Luas</Text>
          <Text style={[textStyles.titleMenu, { fontSize: 16 }]}>Wilayah</Text>
        </View>
        <Text style={[textStyles.subHeading, { fontSize: 16 }]}>
          {luasWilayah} km<Text style={textStyles.exponentText}>2</Text>
        </Text>
      </View>
      <View style={qStyles.wrapper}>
        <MaterialCommunityIcons name="cow" size={50} color={color.primary} />
        <View>
          <Text style={[textStyles.titleMenu, { fontSize: 16 }]}>Lahan</Text>
          <Text style={[textStyles.titleMenu, { fontSize: 16 }]}>
            Peternakan
          </Text>
        </View>
        <Text style={[textStyles.subHeading, { fontSize: 16 }]}>
          {lahanPeternakan} buah
        </Text>
      </View>
      <View style={qStyles.wrapper}>
        <FontAwesome6 name="sun-plant-wilt" size={50} color={color.primary} />
        <View>
          <Text style={[textStyles.titleMenu, { fontSize: 16 }]}>Lahan</Text>
          <Text style={[textStyles.titleMenu, { fontSize: 16 }]}>
            Pertanian
          </Text>
        </View>
        <Text style={[textStyles.subHeading, { fontSize: 16 }]}>
          {lahanPertanian}
          <Text style={textStyles.exponentText}>ha</Text>
        </Text>
      </View>
    </View>
  );
};

const qStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  wrapper: {
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "30%",
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: color.white,
  },
});

const containerStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: color.white,
    minHeight: Dimensions.get("window").height,
  },
});
export default InformasiDesaScreen;
