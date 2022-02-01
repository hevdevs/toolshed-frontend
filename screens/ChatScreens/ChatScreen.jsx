import React, { useCallback, useLayoutEffect, useState } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { auth, db } from "../../firebase.js";
import { Text } from "react-native";
import {
  addDoc,
  collection,
  orderBy,
  query,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);

  const { messageId, userUsername } = route.params;

  // const messageId =
  //   userUid < auth.currentUser.uid
  //     ? `${auth.currentUser.uid}-${userUid}`
  //     : `${userUid}-${auth.currentUser.uid}`;

  useLayoutEffect(() => {
    try {
      const collectionRef = collection(db, `groups/${messageId}/messages`);
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
    } catch (err) {
      alert("Failed to fetch messages");
      console.log(err);
    }
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, `groups/${messageId}/messages`), {
      _id,
      createdAt,
      text,
      user,
    });
    // updateDoc(doc(db, `users/${auth.currentUser.uid}`), {
    //   chats: arrayUnion(messageId),
    // });
    // updateDoc(doc(db, `users/${userUid}`), {
    //   chats: arrayUnion(messageId),
    // });
  }, []);

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "orange",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  }

  return (
    <>
      <Text
        style={{
          textAlign: "center",
          backgroundColor: "orange",
          color: "white",
          fontSize: 20,
        }}
      >{`\n\n@${userUsername}`}</Text>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        renderBubble={renderBubble}
        user={{
          _id: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
        }}
        renderAvatar={() => null}
        showAvatarForEveryMessage={true}
      />
    </>
  );
};

export default ChatScreen;
