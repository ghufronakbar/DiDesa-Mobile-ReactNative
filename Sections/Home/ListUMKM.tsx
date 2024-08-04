import RenderCardUMKM from "Components/RenderCardUMKM";
import color from "Constants/Color";
import { dataUmkm } from "dummy/dummyData";
import { Text, View } from "react-native";
import textStyles from "Styles/textStyles";
import React, { useEffect, useState } from "react";
import { getUMKM } from "Services/homepage";
import SpinnerLoading from "Components/SpinnerLoading";
import RenderSkeletonCard from "Components/RenderSkeletonCard";

const ListUMKM = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getUMKM();    
    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();    
  }, []);

    return (
      <View style={{ gap: 16 }}>
        <View
          style={{
            gap: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={textStyles.titleMenu}>UMKM</Text>
          <Text style={{ color: color.primary }} onPress={() => navigation.navigate("UMKM")}>Lihat Semua</Text>
        </View>
        {isLoading ? <RenderSkeletonCard count={2}/>: <RenderCardUMKM data={data} navigation={navigation} key={data.umkmId} />}
        
      </View>
    );
  };

  export default ListUMKM