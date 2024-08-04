import { useFocusEffect } from "@react-navigation/native";
import color from "Constants/Color";
import DEFAULT_PROFILE from "Constants/DefaultProfile";
import { useCallback, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { getProfile } from "Services/homepage";
import textStyles from "Styles/textStyles";

const NavTop = ({ navigation }: { navigation: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getProfile();
      if (response) {
        setData(response.data);
        setIsLoggedIn(response.isLoggedIn);
      }
    } catch (error) {
      setData(null);
      setIsLoggedIn(false);      
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect");
      fetchData();
      console.log("data", data);

      return () => {};
    }, [])
  );

  return (
    <View
      style={{
        backgroundColor: color.white,
        width: Dimensions.get("window").width,
        height: 70,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 5,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 50, height: 50 }}
        />
        <Text style={textStyles.heading}>DiDesa</Text>
      </View>
      {isLoggedIn ? (
        <TouchableOpacity
          onPress={() => (isLoading ? null : navigation.navigate("Profile"))}
        >
          <Image
            source={{ uri: data?.foto || DEFAULT_PROFILE }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => (isLoading ? null : navigation.navigate("Login"))}
        >
          <Image
            source={{ uri: DEFAULT_PROFILE }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NavTop;
