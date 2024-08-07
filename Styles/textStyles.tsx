import color from "Constants/Color";
import { StyleSheet } from "react-native";

const textStyles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Outfit-SemiBold",
    color: color.black,
    letterSpacing: 0.5,
  },
  subHeading: {
    fontSize: 18,    
    fontFamily: "Outfit-SemiBold",
    color: color.black,
    letterSpacing: 0.5,
  },
  titleMenu: {
    fontSize: 18,
    fontFamily: "Outfit-SemiBold",
    fontWeight: "bold",
    color: color.black,
    letterSpacing: 0.5,
  },
  content : {
    fontSize: 16,
    fontFamily: "Outfit-Regular",
    color: color.tertiary,
    letterSpacing: 0.5,    
},
exponentText: {
  fontSize: 10,
  lineHeight: 16, // Adjust the lineHeight to position the exponent correctly
  position: 'relative',
  top: -10, // Adjust this value to move the exponent up or down
},
});

export default textStyles;
