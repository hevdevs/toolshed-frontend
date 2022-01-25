import { View, Text, StyleSheet } from "react-native";
import React from "react";
import NavTabs from "../components/NavTabs";


const HomeScreen = () => {

  return (
    <>
      <NavTabs />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})