import { View, Text, StyleSheet, Pressable, Picker, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import * as Progress from "react-native-progress";

import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import dayjs from "dayjs";

const PostRequest = ({ route, navigation: { goBack } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  const { setNewRequest } = route.params;

  const categories = [
    "DIY",
    "Household",
    "Kitchen",
    "Electronics",
    "Arts and Crafts",
    "Garden",
    "Furniture",
  ];

  const resetForms = () => {
    setTitleInput("");
    setBodyInput("");
  };

  const handleSubmit = async () => {
    setIsLoading(true)
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
      setNewRequest((currNewReq) => {
        !currNewReq;
      });
      alert("Request successfully posted!");
      resetForms();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert("Request failed to post!");
      console.log(err);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Request an Item</Text>
      </View>
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.subheader}>Enter item name</Text>
          <TextInput
            style={styles.input}
            placeholder="What are you looking for?"
            value={titleInput}
            onChangeText={setTitleInput}
          />
          <Text style={styles.subheader}>Enter item description</Text>
          <TextInput
            style={styles.input}
            placeholder="Add a description"
            value={bodyInput}
            onChangeText={setBodyInput}
          />
          <Text style={styles.subheader}>
            Select a category for your item request
          </Text>
          <TouchableOpacity style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedCategory={selectedCategory}
              style={{ height: 50, width: 150 }}
              onValueChange={(categoryValue) =>
                setSelectedCategory(categoryValue)
              }
            >
              {categories.map((category, index) => {
                return (
                  <Picker.Item label={category} value={category} key={index} />
                );
              })}
            </Picker>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>Submit!</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => goBack()}>
            <Text style={styles.text}>Go Back</Text>
          </Pressable>
        </View>
        {isLoading ? (
          <Progress.Circle
            size={50}
            indeterminate={true}
            style={styles.spinner}
            color={"#F36433"}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default PostRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#9DD9D2",
  },
  headerContainer: {
    backgroundColor: "#F36433",
    width: "100%",
    height: "15%",
  },
  header: {
    alignSelf: "center",
    position: "absolute",
    top: 0,
    marginTop: "15%",
    margin: 0,
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF8F0",
  },
  formContainer: {
    backgroundColor: "#9DD9D2",
    width: "100%",
    paddingTop: "10%",
  },
  input: {
    backgroundColor: "#FFF8F0",
    margin: "5%",
    color: "#172121",
  },
  picker: {
    height: 50,
    width: 150,
    color: "#172121",
  },
  pickerContainer: {
    margin: "5%",
    backgroundColor: "#2DC2DB",
    width: 150,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: "10%",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#F36433",
    marginRight: "5%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 75,
    bottom: 0,
  },
  text: {
    color: "#FFF8F0",
    fontWeight: "bold",
  },
  subheader: {
    alignSelf: "center",
    color: "#172121",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: "2%",
    borderBottomColor: "#172121",
    borderBottomWidth: 1,
  },
  spinner: {
    alignSelf: "center",
  },
});
