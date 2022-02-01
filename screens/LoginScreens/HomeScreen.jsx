import {   StyleSheet } from "react-native";
import React from "react";
import NavTabs from "../../components/NavTabs";
import AppLoading from "expo-app-loading";
import { Oxygen_400Regular, Oxygen_700Bold, useFonts } from "@expo-google-fonts/oxygen";


const HomeScreen = () => {
  let [fontsLoaded] = useFonts({
    Oxygen_400Regular, Oxygen_700Bold,
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavTabs style={ styles.container } />
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Oxygen_400Regular",
  },
});