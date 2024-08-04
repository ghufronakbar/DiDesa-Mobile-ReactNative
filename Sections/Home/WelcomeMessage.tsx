import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getInfo, getProfile } from "Services/homepage";
import textStyles from "Styles/textStyles";
import { useFocusEffect } from "@react-navigation/native";

const WelcomeMessage = () => {  
  const [name, setName] = useState<string>("");
  const date = new Date();
  const hours = date.getHours();
  let time = "";
  if (hours < 10) {
    time = "Pagi";
  } else if (hours < 14) {
    time = "Siang";
  } else if (hours < 18) {
    time = "Sore";
  } else {
    time = "Malam";
  }
  const fetchData = async () => {
    try {
      const { isLoggedIn, name } = await getInfo()
      setName(name||"Guest");
      return { isLoggedIn, name };
    } catch (error) {}
  };
  

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );  

  return (
    <View style={{ gap: 4 }}>
      <Text style={textStyles.heading}>Selamat {time},</Text>
      <Text style={textStyles.heading}>{name }</Text>
    </View>
  );
};

export default WelcomeMessage;
