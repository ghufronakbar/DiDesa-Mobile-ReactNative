import Copyright from "Components/Copyright";
import color from "Constants/Color";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const SplashScreen = ({ navigation }: { navigation: any }) => {

    useEffect(() => {
        setTimeout(() => {
          navigation.replace("Home");
        }, 3000);            
    })
    
  return (
    <SafeAreaView style={splashStyles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={splashStyles.text1}>Di</Text>
        <Text style={splashStyles.text2}>Desa</Text>
      </View>
      <View style={splashStyles.copyright}>
        <Copyright />
      </View>
    </SafeAreaView>
  );
};

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  copyright: {
    position: "absolute",
    bottom: 40,
  },
  text1: {
    fontSize: 50,
    color: color.secondary,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  text2: {
    fontSize: 50,
    color: color.primary,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});

export default SplashScreen;
