import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { auth, db } from "../firebase";
import { doc, query, orderBy, limit } from "firebase/firestore";

const ChatRow = ({ chat }) => {
  const chatRef = doc(db, "groups", chat);
  const q = query(chatRef, orderBy("createdAt", "desc"), limit(1));

  return (
    <TouchableOpacity>
      <Text>{chat}</Text>
    </TouchableOpacity>
  );
};

export default ChatRow;
