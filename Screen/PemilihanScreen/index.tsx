import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BackButton from "Components/BackButton";
import CardCalon from "Components/CardCalon";
import SpinnerLoading from "Components/SpinnerLoading";
import ToastNotification from "Components/ToastNotification";
import color from "Constants/Color";
import { CalonKetua } from "Models/CalonKetua";
import { Pemilihan } from "Models/Pemilihan";
import { getLatestPemilihan } from "Services/pemilihan";
import detailStyles from "Styles/detailStyles";
import textStyles from "Styles/textStyles";
import formatDate from "utils/formatDate";

const PemilihanScreen = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<Pemilihan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  const pemilihanStyles = StyleSheet.create({
    badge: {
      backgroundColor:
        data?.status === "Belum Berlangsung"
          ? color.secondary
          : data?.status === "Selesai"
          ? color.tertiary
          : color.primary,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 12,
      alignSelf: "flex-start",
    },
    badgeName: { fontSize: 15, color: color.white },
    date: { color: color.tertiary, fontWeight: "bold", fontSize: 13 },
    info: { color: color.tertiary, fontWeight: "bold", fontSize: 16 },
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getLatestPemilihan();
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigation.goBack();
      Alert.alert("Error", "Terjadi kesalahan");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  const renderHeader = () => (
    <View style={{ paddingHorizontal: 16 }}>
      {isToastOpen && (
        <ToastNotification
          status="info"
          message="Berhasil melakukan pemilihan"
          onClose={() => {
            setIsToastOpen(false);
          }}
        />
      )}     
      <View style={{ gap: 8 }}>
        <Text style={textStyles.heading}>{data?.judul}</Text>
        <View style={pemilihanStyles.badge}>
          <Text style={pemilihanStyles.badgeName}>{data?.status}</Text>
        </View>
        <Text style={textStyles.content}>{data?.deskripsi}</Text>
        <Text style={pemilihanStyles.info}>Waktu Pemilihan: </Text>
        <View style={{ flexDirection: "row", gap: 8, marginTop: -8 }}>
          <Text style={pemilihanStyles.date}>
            {formatDate(data?.tanggalMulai!)}
            {"   -"}
          </Text>
          <Text style={pemilihanStyles.date}>
            {formatDate(data?.tanggalSelesai!)}
          </Text>
        </View>
        <Text style={[pemilihanStyles.info,{marginBottom: 8}]}>
          Partisipan: {data?._count.calonKetua}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={detailStyles.container}>
         <View style={detailStyles.appBar}>
        <View style={detailStyles.wrapperHeader}>
          <BackButton navigation={navigation} />
          <Text style={detailStyles.header}>Pemilihan Kepala Desa</Text>
        </View>
      </View>
      <FlatList
        data={data?.calonKetua.length ? data?.calonKetua : []}
        renderItem={({ item, index }) => (
          <CardCalon
            key={index}
            calonKetuaId={item.calonKetuaId}
            nama={item.warga.namaLengkap}
            foto={item.warga.foto}
            totalVote={item._count.vote}
            deskripsi={item.deskripsi}
            isVoted={data?.isVoted!}
            isVoteable={data?.isVoteable!}
            refetch={fetchData}
            setLoading={() => {
              setIsLoading(true);
            }}
            setToast={() => {
              setIsToastOpen(true);
            }}
          />
        )}
        keyExtractor={(item) => item.calonKetuaId.toString()}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: color.white,
  },
});

export default PemilihanScreen;
