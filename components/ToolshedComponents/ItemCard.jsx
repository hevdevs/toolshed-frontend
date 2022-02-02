import { StyleSheet, Text, View, Image, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { auth, db } from "../../firebase";

import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { updateDoc, doc } from "firebase/firestore";

import AppLoading from "expo-app-loading";
import {
  Oxygen_400Regular,
  Oxygen_700Bold,
  useFonts,
} from "@expo-google-fonts/oxygen";

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
        setIsLoading(false);
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

  let [fontsLoaded] = useFonts({
    Oxygen_400Regular,
    Oxygen_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.card}>
      {itemImage ? (
        <Image style={styles.image} source={{ uri: itemImage }} />
      ) : (
        <Progress.Circle
          size={50}
          indeterminate={true}
          style={styles.spinner}
          color={"#F36433"}
        />
      )}
      <View>
        <Text style={styles.bodyText}>
          <Ionicons name={"construct"} size={16} />
          {` ${item.name}`}
        </Text>
        <Text style={styles.bodyDesc}>
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
    fontFamily: "Oxygen_400Regular",
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
    fontFamily: "Oxygen_700Bold",
    alignSelf: "center",
  },
  spinner: {
    alignSelf: "center",
  },
  bodyText: {
    marginLeft: "5%",
    fontSize: 16,
    color: "#F36433",
    fontFamily: "Oxygen_700Bold",
  },
  bodyDesc: {
    margin: "5%",
    fontSize: 14,
    color: "#172121",
    fontFamily: "Oxygen_700Bold",
    marginBottom: "5%",
  },
});
