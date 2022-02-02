import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { getUserDataFromUid } from "../utils";
import AppLoading from "expo-app-loading";
import {
  Oxygen_400Regular,
  Oxygen_700Bold,
  useFonts,
} from "@expo-google-fonts/oxygen";

const ChatCard = ({ chat, navigation }) => {
  const [message, setMessage] = useState("");
  const [chatee, setChatee] = useState("");

  useLayoutEffect(() => {
    const chatRef = collection(db, "groups", `${chat}/messages`);
    const q = query(chatRef, orderBy("createdAt", "desc"), limit(1));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => setMessage(doc.data()));
    });
    (async () => {
      try {
        const chatters = chat.split("-");
        const chatee =
          chatters[0] === auth.currentUser.uid ? chatters[1] : chatters[0];
        // const querySnapshot = await getDocs(q);
        const chateeUser = await getUserDataFromUid(chatee);
        setChatee(chateeUser);
      } catch (err) {
        console.log(err);
      }
    })();
    return unsubscribe;
  }, []);

  let [fontsLoaded] = useFonts({
    Oxygen_400Regular,
    Oxygen_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {message.user ? (
        <Pressable
          onPress={() =>
            navigation.navigate("ChatScreen", {
              messageId: chat,
              userUsername: `${chatee.firstName} ${chatee.surname}`,
              navigation,
            })
          }
        >
          <View style={styles.card}>
            <Text
              style={styles.cardTitle}
            >{`@${chatee.firstName} ${chatee.surname}`}</Text>
            <Text>{`${
              auth.currentUser.email === message.user._id ? "You: " : "Them: "
            }${message.text}`}</Text>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "#9DD9D2",
    fontFamily: "Oxygen_400Regular",
  },
  card: {
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
});
