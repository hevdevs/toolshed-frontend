import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase.js";
import React, { useState, useEffect } from "react";
import { doc, deleteDoc } from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";
import AppLoading from "expo-app-loading";
import {
  Oxygen_400Regular,
  Oxygen_700Bold,
  useFonts,
} from "@expo-google-fonts/oxygen";

const UserItems = ({ setIsItemDeleted, items }) => {
  const user = auth.currentUser;

  const handleOnPress = async (item) => {
    try {
      await deleteDoc(doc(db, "items", item.itemUid));
      alert("Item deleted");
      setIsItemDeleted(true);
    } catch (err) {
      console.log(err);
      setIsItemDeleted(false);
    }
  };

  let [fontsLoaded] = useFonts({
    Oxygen_400Regular,
    Oxygen_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.cardContainer}>
      {items.length ? (
        items.map((item, index) => {
          return (
            <View key={index} style={styles.card}>
              <Text style={styles.subheader}>{item.name}</Text>
              <Text style={styles.bodyDesc}>{`"${item.description}"`}</Text>
              <Text style={styles.bodyText}>Category: {item.category}</Text>

              <Pressable
                style={styles.button}
                onPress={() => handleOnPress(item)}
              >
                <Text style={styles.text}>
                  <Ionicons name={"close-circle"} size={16} />
                  {` DELETE`}
                </Text>
              </Pressable>
            </View>
          );
        })
      ) : (
        <View style={styles.card}>
          <Text style={styles.bodyText}>No item posts found</Text>
        </View>
      )}
    </View>
  );
};

export default UserItems;

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: "4%",
    backgroundColor: "#FFF8F090",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    fontFamily: "Oxygen_400Regular",
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: "2%",
    padding: "5%",
    borderRadius: 5,
    margin: "5%",
    marginTop: 0,
    backgroundColor: "#FFF8F0",
  },
  button: {
    backgroundColor: "#F36433",
    padding: 15,
    width: "50%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: "5%",
  },
  buttonText: {
    color: "white",
    fontFamily: "Oxygen_700Bold",
    fontSize: 16,
  },
  subheader: {
    color: "#172121",
    fontFamily: "Oxygen_700Bold",
    fontSize: 20,
    marginBottom: "5%",
    borderBottomColor: "#172121",
    borderBottomWidth: 1,
  },
  bodyText: {
    fontSize: 16,
    color: "#172121",
    fontFamily: "Oxygen_700Bold",
  },
  bodyDesc: {
    fontSize: 16,
    color: "#172121",
    fontFamily: "Oxygen_700Bold",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: "5%",
  },
  text: {
    fontSize: 16,
    fontFamily: "Oxygen_700Bold",
    color: "#FFF8F0",
  },
});
