import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
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
    <View style={styles.itemContainer}>
      {items.map((item) => {
        return (
          <>
            <View key={item.requestUid} style={styles.itemCard}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text>{item.category}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleOnPress()}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      })}
    </View>
  );
};

export default UserItems;

const styles = StyleSheet.create({
  itemContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  itemCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    width: "100%",
    margin: 5,
    alignItems: "center",
    height: "40%",
  },
  buttonContainer: {
    margin: 5,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },
});
