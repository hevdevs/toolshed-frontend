import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { auth } from "../firebase";
import AppLoading from "expo-app-loading";
import { Oxygen_400Regular, Oxygen_700Bold, useFonts } from "@expo-google-fonts/oxygen";

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      const signOut = await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };

  let [fontsLoaded] = useFonts({
    Oxygen_400Regular, Oxygen_700Bold,
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    fontFamily: "Oxygen_400Regular"
  },
  button: {
    backgroundColor: "#0782f9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontFamily: "Oxygen_700Bold",
    fontSize: 16,
  },
});

export default SignOut;
