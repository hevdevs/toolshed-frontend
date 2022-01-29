
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";

import { getDownloadURL, ref } from "@firebase/storage";
import { storage, auth, db } from "../../firebase";
import CalendarComponent from "../../components/CalendarComponent";
import { updateDoc, doc, arrayUnion, addDoc } from "firebase/firestore";

import { Ionicons } from "@expo/vector-icons";

const ItemScreen = ({ route, navigation }) => {
  const { item } = route.params;
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

  const handlePress = async () => {
    const messageId =
      item.userInfo.userUid < auth.currentUser.uid
        ? `${auth.currentUser.uid}-${item.userInfo.userUid}`
        : `${item.userInfo.userUid}-${auth.currentUser.uid}`;
    await updateDoc(doc(db, `users/${auth.currentUser.uid}`), {
      chats: arrayUnion(messageId),
    });
    await updateDoc(doc(db, `users/${item.userInfo.userUid}`), {
      chats: arrayUnion(messageId),
    });

    navigation.navigate("ChatScreen", {
      messageId,
      userUsername: item.userInfo.userUsername,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Toolshed</Text>
      <View style={styles.contentContainer}>
        <Image style={styles.image} source={{ uri: itemImage }} />
        <Text>{item.name}</Text>
        <Text>
          {item.userInfo.userFirstName} {item.userInfo.userSurname}
        </Text>
        <Text>{item.description}</Text>
      </View>
      <View style={styles.contentContainer}>
        {/* <CalendarComponent /> */}

        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          itemOwner={item.owner}
        >
          <Text style={styles.text}>MESSAGE <Ionicons name={"paper-plane"} size={16} /></Text>
        </TouchableOpacity>
        <Pressable
          title="View Map"
          style={styles.button}
          onPress={() => {
            navigation.navigate("MapScreen", { item });
          }}
        >
          <Text style={styles.text}>
            VIEW MAP <Ionicons name={"map"} size={16} />
          </Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.text}>
            <Ionicons name={"arrow-back-circle"} size={16} />
            {" BACK"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F36433",
  },
  header: {
    marginTop: "10%",
    margin: "5%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF8F0",
  },
  button: {
    backgroundColor: "#F36433",
    margin: "5%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    height: "60%",
    width: "60%",
  },
  contentContainer: {
    width: "100%",
    padding: 0,
    margin: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD9D2",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF8F0",
  },
});
