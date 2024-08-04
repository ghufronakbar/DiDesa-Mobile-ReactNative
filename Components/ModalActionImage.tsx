import color from "Constants/Color";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/AntDesign";

type ModalActionImageProps = {
  title: string;
  message: string;
  isVisible: boolean;
  onCamera: () => void;
  onGallery: () => void;
  onClose: () => void;
  onDelete?: () => void;
};

const ModalActionImage: React.FC<ModalActionImageProps> = ({
  title,
  message,
  isVisible,
  onCamera,
  onGallery,
  onClose,
  onDelete,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={24} color="gray" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          {onDelete &&
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={onDelete}
          >
            <Text style={styles.buttonText}>Hapus</Text>
          </TouchableOpacity>
          }
          <TouchableOpacity
            style={[styles.button, styles.cameraButton]}
            onPress={onCamera}
          >
            <Text style={styles.buttonText}>Kamera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.galleryButton]}
            onPress={onGallery}
          >
            <Text style={styles.buttonText}>Galeri</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",    
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    width: "30%",
    alignItems: "center",
  },
  cameraButton: {
    backgroundColor: color.primary,
  },
  galleryButton: {
    backgroundColor: color.secondary,
  },
  deleteButton: {
    backgroundColor: color.tertiary,
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
  },
});

export default ModalActionImage;
