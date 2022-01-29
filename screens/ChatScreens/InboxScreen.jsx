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

  console.log(chats);

  return (
    <View style={styles.container}>
      <Text>chats: </Text>
      {chats.map((chat) => (
        <ChatCard chat={chat} />
      ))}
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
