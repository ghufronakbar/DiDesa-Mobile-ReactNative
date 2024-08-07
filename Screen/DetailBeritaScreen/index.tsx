import color from "Constants/Color";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import textStyles from "Styles/textStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import formatDate from "utils/formatDate";
import inputStyles from "Styles/inputStyles";
import {
  createKomentar,
  deleteKomentar,
  getDetailBerita,
} from "Services/berita";
import SpinnerLoading from "Components/SpinnerLoading";
import { Komentar } from "Models/Komentar";
import ToastNotification from "Components/ToastNotification";
import { ApiError } from "Models/ApiError";
import ModalConfirmation from "Components/ModalConfirmation";
import detailStyles from "Styles/detailStyles";
import BackButton from "Components/BackButton";

const DetailBeritaScreen = ({ navigation, route }: any): JSX.Element => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const { beritaId } = route.params;
  const [isi, setIsi] = useState<string>("");
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getDetailBerita(beritaId);
    setData(response.data);
    setIsLoading(false);
  };

  const sendKomentar = async () => {
    if (!isi) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await createKomentar(beritaId, isi);
      setIsError(false);
      setMessage(response.message);
      setIsToastOpen(true);
      setIsi("");
      fetchData();
    } catch (error) {
      const apiError = error as ApiError;
      setMessage(
        apiError?.response?.data?.message || "Gagal menambahkan komentar"
      );
      setIsError(true);
      setIsToastOpen(true);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await deleteKomentar(selectedId.toString());
      setIsError(false);
      setMessage(response.message);
      setIsConfirmOpen(false);
      setIsToastOpen(true);
      setIsLoading(false);
      fetchData();
    } catch (error) {
      const apiError = error as ApiError;
      setMessage(
        apiError?.response?.data?.message || "Gagal menghapus komentar"
      );
      setIsError(true);
      setIsToastOpen(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <SafeAreaView style={detailStyles.container}>
      {isToastOpen && (
        <ToastNotification
          status={isError ? "error" : "info"}
          message={message}
          onClose={() => setIsToastOpen(false)}
        />
      )}

      <View style={detailStyles.appBar}>
        <BackButton navigation={navigation} />
        <View style={detailStyles.wrapperHeader}>
          <Text style={detailStyles.header}>Detail</Text>
        </View>
      </View>
      {isLoading && <SpinnerLoading />}
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <>
            {data && (
              <View
                style={{ gap: 8, minHeight: Dimensions.get("window").height }}
              >
                <Text style={textStyles.heading}>{data.judul}</Text>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  {data.subjudul}
                </Text>
                <Image
                  source={{ uri: data.gambar }}
                  style={{ width: "100%", height: 200, marginTop: 16 }}
                />
                <Text
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    fontSize: 13,
                    marginTop: 8,
                  }}
                >
                  {formatDate(data.tanggal)}
                </Text>
                <Text
                  style={[
                    textStyles.content,
                    { textAlign: "justify", color: color.black },
                  ]}
                  numberOfLines={showAll ? undefined : 3}
                >
                  {data.isi}
                </Text>

                <Text
                  style={{
                    color: "gray",
                    fontWeight: "bold",
                    alignSelf: "flex-end",
                    fontSize: 13,
                    padding: 8,
                  }}
                  onPress={toggleShowAll}
                >
                  {showAll ? "Tampilkan Lebih Sedikit" : "Tampilkan Semua"}
                </Text>

                <Text
                  style={[textStyles.heading, { marginTop: 16, fontSize: 18 }]}
                >
                  Komentar
                </Text>
                <ModalConfirmation
                  isVisible={isConfirmOpen}
                  message="Yakin ingin menghapus komentar?"
                  onClose={() => {
                    setIsConfirmOpen(false);
                    setSelectedId(0);
                  }}
                  onConfirm={() => {
                    handleDelete();
                  }}
                  title="Hapus Komentar"
                />
                <View style={{ marginBottom: 120 }}>
                  {data && data.komentar.length === 0 && (
                    <Text style={textStyles.content}>Belum ada komentar</Text>
                  )}
                  {data &&
                    data.komentar.map((item: Komentar) => (
                      <View
                        style={komentarStyles.container}
                        key={item.komentarId}
                      >
                        <Image
                          source={{ uri: item.warga.foto }}
                          style={komentarStyles.avatar}
                        />
                        <View style={komentarStyles.wrapperText}>
                          <Text style={komentarStyles.name}>
                            {item.warga.namaLengkap}
                          </Text>
                          <Text
                            style={[textStyles.content, komentarStyles.content]}
                          >
                            {item.isi}
                          </Text>
                        </View>
                        <Text style={komentarStyles.time}>
                          {formatDate(item.tanggal)}
                        </Text>
                        {item.isDeleteable && (
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedId(item.komentarId);
                              setIsConfirmOpen(true);
                            }}
                            style={{
                              position: "absolute",
                              right: 0,
                              bottom: 8,
                            }}
                          >
                            <MaterialIcons
                              name="delete-outline"
                              size={16}
                              color={color.black}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                </View>
              </View>
            )}
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={containerStyles.container}
      />
      <View
        style={{
          backgroundColor: color.white,
          width: Dimensions.get("window").width * 0.9,
          alignSelf: "center",
          height: 72,
          borderRadius: 28,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          position: "absolute",
          bottom: 40,
        }}
      >
        <TextInput
          style={[inputStyles.input, { width: "90%", borderRadius: 20 }]}
          placeholder="Komentar..."
          placeholderTextColor={color.gray}
          keyboardType="default"
          value={isi}
          onChangeText={(text) => setIsi(text)}
        />
        <MaterialIcons
          name="send"
          size={24}
          color={color.primary}
          onPress={() => {
            sendKomentar();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const komentarStyles = StyleSheet.create({
  container: {
    gap: 8,
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    padding: 8,
    width: "100%",
  },
  avatar: { width: 50, height: 50, borderRadius: 50 },
  wrapperText: { gap: 4, width: "80%" },
  name: { letterSpacing: 0.5, fontSize: 16, fontWeight: "500" },
  content: { color: color.black, fontSize: 13, width: "100%" },
  time: { color: "gray", position: "absolute", right: 0, top: 0, fontSize: 11 },
});

const containerStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: color.white,
  },
});

export default DetailBeritaScreen;
