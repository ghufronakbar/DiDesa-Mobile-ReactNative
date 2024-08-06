import color from "Constants/Color";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import NavTop from "Components/NavTop";
import BeritaPrioritas from "Sections/Home/BeritaPrioritas";
import ListUMKM from "Sections/Home/ListUMKM";
import ListBerita from "Sections/Home/ListBerita";
import ListMenu from "Sections/Home/ListMenu";
import WelcomeMessage from "Sections/Home/WelcomeMessage";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavTop navigation={navigation} />
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={() => (
          <View style={{ gap: 24 }}>
            <WelcomeMessage />
            <BeritaPrioritas navigation={navigation} />
            <ListMenu navigation={navigation} />
            <ListUMKM navigation={navigation} />
            <ListBerita navigation={navigation} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={containerStyles.container}
      />
    </SafeAreaView>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: color.white,
  },
});

export default HomeScreen;
