import color from "Constants/Color";
import { Dimensions, StyleSheet } from "react-native";

const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get("window").height,
    backgroundColor: color.white,
  },
  appBar: {
    backgroundColor: color.white,
    width: Dimensions.get("window").width,
    height: 70,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    elevation: 5,
    
  },
  wrapperHeader: { flexDirection: "row", alignItems: "center", gap: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Outfit-SemiBold",
    color: color.black,
    letterSpacing: 0.5,
  },
});

export default detailStyles;
