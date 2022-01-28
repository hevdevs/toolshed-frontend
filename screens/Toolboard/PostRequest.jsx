import { View, Text, StyleSheet, Pressable, Picker } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import dayjs from "dayjs";

const PostRequest = ({ navigation: { goBack } }) => {
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  const categories = [
    "DIY",
    "Household",
    "Kitchen",
    "Electronics",
    "Garden",
    "Furniture",
  ];

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
      category: selectedCategory,
      userInfo: {
        userUid: auth.currentUser.uid,
        userFirstName: fields.firstName.stringValue,
        userSurname: fields.surname.stringValue,
        userLocation: fields.userLocation,
        userUsername: auth.currentUser.displayName,
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
        placeholder="What are you looking for?"
        value={titleInput}
        onChangeText={setTitleInput}
      />
      <TextInput
        placeholder="Add a description"
        value={bodyInput}
        onChangeText={setBodyInput}
      />
      <Text>Select a category for your item request</Text>
      <Picker
        selectedCategory={selectedCategory}
        style={{ height: 50, width: 150 }}
        onValueChange={(categoryValue) => setSelectedCategory(categoryValue)}
      >
        {categories.map((category, index) => {
          return <Picker.Item label={category} value={category} key={index} />;
        })}
      </Picker>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>Post your request to the Toolboard</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => goBack()}>
        <Text style={styles.text}>Go Back</Text>
      </Pressable>
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
    alignItems: "center",
  },
  text: {

    color: "#FFF8F0",
  },
});
