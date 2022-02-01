import { StyleSheet, Text, View, Image, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { auth, db } from "../../firebase";

import { Ionicons } from "@expo/vector-icons";
import { updateDoc, doc } from "firebase/firestore";

const ItemCard = ({ item }) => {
  const storage = getStorage();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLent, setIsLent] = useState(!item.available);
  const [itemImage, setItemImage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const imageUrl = await getDownloadURL(ref(storage, `${item.imageUri}`));
        setItemImage(imageUrl);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const toggleAvailibility = async () => {
    setIsEnabled((previousState) => !previousState);
    setIsLent((previousState) => !previousState);
  };

  const updateAvailability = async () => {
    const docRef = doc(db, "items", item.uid);
    await updateDoc(docRef, { available: !isLent });
  };

  useEffect(() => {
    updateAvailability();
  }, [isLent]);

  return (
    <View style={styles.card}>
      {itemImage ? (
        <Image style={styles.image} source={{ uri: itemImage }} />
      ) : null}
      <View>
        <Text style={styles.cardText}>{`${item.name} \n`}</Text>
        <Text style={styles.cardText}>
          Posted by {item.userInfo.userUsername}
        </Text>
        {isLent === true ? (
          <View style={styles.statusLent}>
            <Text style={styles.text}>
              LENT <Ionicons name={"close-circle"} size={16} />
            </Text>
          </View>
        ) : null}
        {item.userInfo.userUsername === auth.currentUser.displayName ? (
          <View>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#9DD9D2", true: "#F36433" }}
              thumbColor={isEnabled ? "#2DC2BD" : "#2DC2BD"}
              onValueChange={toggleAvailibility}
              value={isLent}
              label={"Toggle"}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    padding: "5%",
    borderRadius: 5,
    margin: "5%",
    backgroundColor: "#FFF8F0",
  },
  cardText: {
    marginRight: 0,
    marginLeft: "5%",
  },
  image: {
    width: 100,
    height: 100,
    padding: 0,
    margin: 0,
  },
  statusLent: {
    backgroundColor: "#F36433",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    bottom: -25,
    left: -120,
    position: "absolute",
  },
  switch: {
    bottom: -35,
    right: -70,
    position: "absolute",
  },
  text: {
    color: "#FFF8F0",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
