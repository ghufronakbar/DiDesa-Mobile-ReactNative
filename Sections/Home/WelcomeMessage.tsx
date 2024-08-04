import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getProfile } from "Services/homepage";
import textStyles from "Styles/textStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeMessage = () => {
  
  const [name, setName] = useState<string>("Untuk Kamu");
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
      const response = await getProfile();
      if (response.isLoggedIn === true) {
        setName(response.data.namaLengkap);
      }      
    } catch (error) {
            
    }
  };

  useEffect(() => {
    fetchData();    
  }, []);

  return (
    <View style={{ gap: 4 }}>
      <Text style={textStyles.heading}>Selamat {time},</Text>
      <Text style={textStyles.heading}>{name}</Text>
      {/* <Text>{token}</Text> */}
    </View>
  );
};

export default WelcomeMessage;
