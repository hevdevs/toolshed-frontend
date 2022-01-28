import { View, Text, Button, Picker } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import uuid from "react-native-uuid";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import ImagePicker from "../../components/ImagePicker";
import { auth, db, storage } from "../../firebase";
import dayjs from "dayjs";

const PostItem = ({ navigation }) => {
  const [itemName, setItemName] = useState("");
  const [phoneImageUri, setPhoneImageUri] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const categories = [
    "DIY",
    "Household",
    "Kitchen",
    "Electronics",
    "Garden",
    "Furniture"
  ];

  const resetState = () => {
    setItemName("");
    setPhoneImageUri("");
    setItemDescription("");
    setSelectedCategory(undefined);
  };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (err) {
        console.log(err);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", phoneImageUri, true);
      xhr.send(null);
    });

    const reference = ref(storage, `images/${uuid.v4()}.jpeg`);
    try {
      const snapshot = await uploadBytes(reference, blob);
      blob.close();
      const uri = `gs://${snapshot.metadata.bucket}/${snapshot.metadata.fullPath}`;
      return uri;
    } catch (err) {
      throw err;
    }
  };

  const addItem = async (uploadedUri) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const fields = docSnap._document.data.value.mapValue.fields;
    console.log(fields)
    const item = {
      name: itemName,
      description: itemDescription,
      imageUri: uploadedUri,
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
    const postItem = await addDoc(collection(db, "items"), item);
  }

  const handleSubmit = async () => {
    const uploadedUri = await uploadImage();
    uploadedImageRef = ref(storage, uploadedUri);
    try {
      
      await addItem(uploadedUri);
      resetState();
      navigation.navigate("Toolshed");
    } catch (err) {
      if (uploadedUri) await deleteObject(uploadedImageRef);
      alert(err);
    }
  };

  return (
    <>
      <View>
        <Text>{"\n\n"}</Text>
        <TextInput
          placeholder="Item name"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          placeholder="Item description"
          value={itemDescription}
          onChangeText={setItemDescription}
        />
        <Text>Select an item category</Text>
        <Picker
          placeholder="Select Item Category"
          selectedCategory={selectedCategory}
          style={{ height: 50, width: 150 }}
          onValueChange={(categoryValue) => setSelectedCategory(categoryValue)}
        >
          {categories.map((category, index) => {
            return (
              <Picker.Item label={category} value={category} key={index} />
            );
          })}
        </Picker>
        <ImagePicker
          phoneImageUri={phoneImageUri}
          setPhoneImageUri={setPhoneImageUri}
        />
        <Button
          title="Add to toolshed"
          onPress={handleSubmit}
          disabled={!phoneImageUri || !itemName}
        />
      </View>
    </>
  );
};

export default PostItem;
