import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserDataFromUid } from "../../utils";
import { auth } from "../../firebase";
import ChatCard from "../../components/ChatCard";
const InboxScreen = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const currentUserInfo = await getUserDataFromUid(auth.currentUser.uid);
        setChats(currentUserInfo.chats);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Inbox Page</Text>
      <View style={styles.contentContainer}>
        {!chats ? (
          <View style={styles.title}>
            <Text style={styles.noMessage}>No Current Direct Messages</Text>
          </View>
        ) : (
          chats.map((chat, index) => (
            <View style={styles.chatCard} key={index}>
              <ChatCard chat={chat} />
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F36433",
    width: "100%",
  },
  header: {
    margin: "5%",
    marginTop: "10%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF8F0",
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
  noMessage: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
