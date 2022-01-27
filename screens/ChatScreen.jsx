import React, { useCallback, useLayoutEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../config/firebase";
// import { useUser } from "../hooks/useUser";
import {
  addDoc,
  collection,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";

const ChatScreen = () => {
  //   const currentUser = useUser();
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    return unsubscribe;
  });

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
      }}
    />
  );
};

export default ChatScreen;
