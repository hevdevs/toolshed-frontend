import { View, Text, Button, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import dayjs from "dayjs";

const PostRequest = ({ navigation: { goBack } }) => {
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");

  const resetForms = () => {
    setTitleInput("");
    setBodyInput("");
  };

  const handleSubmit = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const fields = docSnap._document.data.value.mapValue.fields

    const request = {
      title: titleInput,
      body: bodyInput,
      userInfo: {
        userUid: auth.currentUser.uid,
        userFirstName: fields.firstName.stringValue,
        userSurname: fields.surname.stringValue,
        userLocation: null,
        userUsername: null,
      },
      timestamp: {
        date: dayjs().format("DD/MM/YY"),
        time: dayjs().format("HH:mm"),
        fullStamp: dayjs().format(),
      },
    };
    try {
      const postRequest = await addDoc(collection(db, "requests"), request);
      alert("Request successfully posted!");
      resetForms();
    } catch (err) {
      alert("Request failed to post!");
      console.log(err);
    }
  };


  return (
    <View>
      <Text>{"\n\n"}</Text>
      <TextInput
        placeholder="Title"
        value={titleInput}
        onChangeText={setTitleInput}
      />
      <TextInput
        placeholder="Body"
        value={bodyInput}
        onChangeText={setBodyInput}
      />
      <Pressable style={styles.button} onPress={() => goBack()}>
        <Text style={styles.text}>Back to Toolboard</Text>
      </Pressable>
        <Button title="Post to Toolboard" onPress={handleSubmit} />
    </View>
  );
};

export default PostRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#F36433",
    margin: "5%",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "#FFF8F0",
  },
});
