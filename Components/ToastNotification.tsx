import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ToastNotificationProps {
  status: 'success' | 'info' | 'error';
  message: string;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ status, message, onClose }) => {
  let backgroundColor;
  let iconName;

  switch (status) {
    case 'success':
      backgroundColor = '#4CAF50'; // Hijau
      iconName = 'checkmark-circle-outline';
      break;
    case 'info':
      backgroundColor = '#2196F3'; // Biru
      iconName = 'information-circle-outline';
      break;
    case 'error':
      backgroundColor = '#F44336'; // Merah
      iconName = 'close-circle-outline';
      break;
    default:
      backgroundColor = '#000'; // Default color
      iconName = 'alert-circle-outline';
  }

  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto hide after 3 seconds
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [onClose]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Icon name={iconName} size={24} color="#FFF" style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Icon name="close" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
    margin: 10,
    position: 'absolute',
    top: 60, // Adjust as needed
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 10, // For Android shadow
  },
  icon: {
    marginRight: 10,
  },
  message: {
    color: '#FFF',
    fontSize: 16,
    flex: 1,
  },
  closeButton: {
    marginLeft: 10,
  },
});

export default ToastNotification;
