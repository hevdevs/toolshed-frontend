import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { auth } from "../firebase";

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      const signOut = await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };

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
    fontWeight: "700",
    fontSize: 16,
  },
});

export default SignOut;
