import color from "Constants/Color";
import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
    primary: {
      backgroundColor: color.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",    
      shadowColor: color.black,
      paddingHorizontal: 16,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    primaryOutline: {
      backgroundColor: color.white,
      borderColor: color.primary,
      paddingVertical: 16,
      borderRadius: 12,
      borderWidth: 1,
      alignItems: "center",
      paddingHorizontal: 16,    
      shadowColor: color.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    textPrimary: {
      color: color.white,
      fontSize: 16,
      fontFamily: "Poppins-SemiBold",
      fontWeight: "bold",
    },
    textOutlinePrimary: {
      color: color.primary,
      fontSize: 16,
      fontFamily: "Poppins-SemiBold",
      fontWeight: "bold",
    },
  });
  
  export default buttonStyles;