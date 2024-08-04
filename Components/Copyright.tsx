import { Text, View } from "react-native";
import React from "react";
import color from "Constants/Color";

const Copyright = ({style}: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
          alignItems: "center",         
          ...style       
        }}
      >
        <Text
          style={{
            color: color.black,
            fontWeight: 700,
          }}
        >
          DiDesa  {""}
        </Text>
        <Text
          style={{
            color: color.black,
          }}
        >
          All rights reserved &copy; 2024
        </Text>
      </View>
    );
  };
  

export default Copyright