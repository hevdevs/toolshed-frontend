import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase.js";
import React, { useState, useEffect } from "react";
import {
  getDocs,
  doc,
  collection,
  where,
  query,
  deleteDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";

const UserItems = () => {
  const [items, setItems] = useState([]);
  const [itemImage, setItemImage] = useState([]);
  const user = auth.currentUser;

  const handleOnPress = async () => {
    await deleteDoc(doc(db, "items", items.requestUid));
  };

  useEffect(async () => {
    try {
      const q = query(
        collection(db, "items"),
        where("userInfo.userUid", "==", user.uid)
      );
      const items = await getDocs(q);
      const itemsArr = [];

      items.forEach((item) => {
        itemsArr.push(item.data());
      });
      setItems(itemsArr);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.cardContainer}>
      {items.length > 0 ? (
        items.map((item) => {
          return (
            <View style={styles.card}>
              <View key={item.requestUid} style={styles.card}>
                <Text style={styles.subheader}>{item.name}</Text>
                <Text style={styles.bodyDesc}>{`"${item.description}"`}</Text>
                <Text style={styles.bodyText}>Category: {item.category}</Text>

                <Pressable style={styles.button} onPress={handleOnPress()}>
                  <Text style={styles.text}>
                    <Ionicons name={"close-circle"} size={16} />
                    {` DELETE`}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })
      ) : (
        <View style={styles.card}>
          <Text style={styles.subheader}>No item posts found</Text>
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
    fontWeight: "bold",
    fontSize: 16,
  },
  subheader: {
    color: "#172121",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: "5%",
    borderBottomColor: "#172121",
    borderBottomWidth: 1,
  },
  bodyText: {
    fontSize: 16,
    color: "#172121",
    fontWeight: "bold",
  },
  bodyDesc: {
    fontSize: 16,
    color: "#172121",
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: "5%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF8F0",
  },
});
