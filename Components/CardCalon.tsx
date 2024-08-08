import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from "react-native";
import Modal from "react-native-modal";
import color from "Constants/Color";
import buttonStyles from "Styles/buttonStyles";
import AntDesign from "react-native-vector-icons/AntDesign";
import ModalConfirmation from "./ModalConfirmation";
import { doVote } from "Services/pemilihan";
import ToastNotification from "./ToastNotification";
import SpinnerLoading from "./SpinnerLoading";

const screenHeight = Dimensions.get("window").height;

const CardCalon = ({
  calonKetuaId,
  nama,
  foto,
  totalVote,
  deskripsi,
  isVoted,
  isVoteable,
  refetch,
  setLoading,
  setToast
}: {
  calonKetuaId: number;
  nama: string;
  foto: string;
  deskripsi: string;
  totalVote: number;
  isVoted: boolean;
  isVoteable: boolean;
  refetch: () => void;
  setLoading: () => void;
  setToast : () => void
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);  

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setIsFullScreen(false);
  };

  
const modalStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: isFullScreen ? screenHeight*11/12 : screenHeight * 2 / 3,
  },
  modalHeader: {
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});

const handleConfirmation = async () =>{
  setIsModalVisible(false);  
  setTimeout(() =>
    setIsConfirmOpen(true)
    , 500);
}

const handleVote = async () => {
  setLoading();
  try {
    await doVote(calonKetuaId);    
    setIsConfirmOpen(false);
    refetch();    
    setToast()
  } catch (error) {    
    console.log(error);    
  }
}

  return (
    <View
      style={{
        gap: 16,
        shadowColor: color.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: color.white,
        padding: 16,
        margin: 8,
        borderRadius: 8,
        alignItems: "center",
        elevation: 5,
        width: "46%",        
      }}
    >      
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: foto }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <View
          style={[
            pemilihanStyles.badge,
            { position: "absolute", top: 0, right: 0, padding: 4 },
          ]}
        >
          <Text style={pemilihanStyles.badgeName}>{totalVote}</Text>
        </View>
      </View>
      <Text style={pemilihanStyles.info} numberOfLines={1}>
        {nama}
      </Text>
      <TouchableOpacity
        style={[
          buttonStyles.primaryOutline,
          { paddingHorizontal: 16, paddingVertical: 8 },
        ]}
        onPress={toggleModal}
      >
        <Text style={[buttonStyles.textOutlinePrimary]}>Detail</Text>
      </TouchableOpacity>

     

      <ModalConfirmation 
      isVisible={isConfirmOpen}
      title={nama}
      message="Apakah anda yakin ingin memilih calon ini?"
      onClose={()=>{setIsConfirmOpen(false)}}
      onConfirm={()=>{handleVote()}}
      />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}              
        swipeThreshold={100}
        swipeDirection="down"
        style={modalStyles.modal}
      >
        <View style={modalStyles.modalContent}>
          <TouchableOpacity style={modalStyles.modalHeader} onPress={()=>{setIsFullScreen(!isFullScreen)}}>
            <Text style={modalStyles.modalTitle}>{nama}</Text>
            <AntDesign
              name="close"
              size={18}
              color={color.black}
              onPress={toggleModal}
              style={{position: "absolute", top: 0, right: 0}}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 16, gap:16}}>
            <Image  source={{ uri: foto }} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center" }} />            
            <ScrollView >
            <Text style={[pemilihanStyles.info,{textAlign:"justify"}]}>{deskripsi}            
            </Text>
            </ScrollView>
          </View>
          {isVoted === false && isVoteable === true && (          
          <TouchableOpacity style={[buttonStyles.primary, {alignSelf: "center", paddingHorizontal: 16, paddingVertical: 8, position: "absolute", bottom: 32}]} onPress={()=>{handleConfirmation()}}>
            <Text style={buttonStyles.textPrimary}>Pilih</Text>
          </TouchableOpacity>          
          )}
          <Text>          
          </Text>
          {isVoteable === true && isVoted === true && (
          <Text style={{alignSelf: "center", paddingHorizontal: 16, paddingVertical: 8, position: "absolute", bottom: 32}}>Anda sudah memilih</Text>
          )}
        </View>
      </Modal>
    </View>
  );
};

const pemilihanStyles = StyleSheet.create({
  badge: {
    backgroundColor: color.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeName: { fontSize: 15, color: color.white },
  date: { color: color.tertiary, fontWeight: "bold", fontSize: 13 },
  info: { color: color.tertiary, fontWeight: "bold", fontSize: 16 },
});


export default CardCalon;
