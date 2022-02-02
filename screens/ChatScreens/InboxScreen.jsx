import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { getUserDataFromUid } from "../../utils";
import { auth, db } from "../../firebase";
import ChatCard from "../../components/ChatCard";
import { onSnapshot, doc } from "firebase/firestore";
import * as Progress from "react-native-progress";

import AppLoading from "expo-app-loading";
import {
  Oxygen_400Regular,
  Oxygen_700Bold,
  useFonts,
} from "@expo-google-fonts/oxygen";

const InboxScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    try {
      setIsLoading(true);
      const unsubscribe = onSnapshot(
        doc(db, "users", auth.currentUser.uid),
        (userData) => {
          const data = userData.data();
          const reverseChat = data.chats ? data.chats.reverse() : [];
          setChats(reverseChat);
          setIsLoading(false);
        }
      );
      return unsubscribe;
    } catch (err) {
      alert("Failed to fetch messages");
      setIsLoading(false);
      console.log(err);
    }
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
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Inbox Page</Text>
      </View>
      <View style={styles.subheadingContainer}>
        <Text style={styles.subheading}>Recent messages</Text>
      </View>
      {isLoading ? (
        <Progress.Circle
          style={styles.progressPie}
          size={50}
          indeterminate={true}
          color={"#F36433"}
        />
      ) : null}
      <View style={styles.contentContainer}>
        <ScrollView>
          {!chats.length && !isLoading ? (
            <View style={styles.title}>
              <Text style={styles.noMessage}>No Current Direct Messages</Text>
            </View>
          ) : (
            chats.map((chat) => (
              <View style={styles.chatCard} key={chat}>
                <ChatCard chat={chat} navigation={navigation} />
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#9dd9d2",
    alignItems: "center",
    fontFamily: "Oxygen_400Regular",
  },
  headerContainer: {
    paddingTop: "10%",
    backgroundColor: "#F36433",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 0,
  },
  header: {
    margin: "5%",
    marginTop: "10%",
    fontSize: 28,
    fontFamily: "Oxygen_700Bold",
    color: "#FFF8F0",
    alignSelf: "center",
  },
  contentContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#9DD9D2",
  },
  subheadingContainer: {
    width: "70%",
    alignItems: "center",
    margin: "5%",
    marginTop: "40%",
    paddingTop: "5%",
    borderBottomColor: "#172121",
    borderBottomWidth: 1,
    paddingBottom: "5%",
  },
  subheading: {
    fontSize: 20,
    textAlign: "center",
    color: "#172121",
    fontFamily: "Oxygen_700Bold",
  },
  noMessage: {
    fontFamily: "Oxygen_700Bold",
    fontSize: 20,
  },
  title: {
    fontFamily: "Oxygen_700Bold",
  },
  chatCard: {
    fontFamily: "Oxygen_700Bold",
    width: "100%",
  },
  button: {
    backgroundColor: "#F36433",
    margin: "5%",
    padding: 10,
    borderRadius: 35,
    position: "relative",
    bottom: 0,
    alignSelf: "flex-end",
  },
  text: {
    color: "#FFF8F0",
    fontFamily: "Oxygen_700Bold",
    fontSize: 30,
  },
  progressPie: {
    alignSelf: "center",
  },
});

export default InboxScreen;
