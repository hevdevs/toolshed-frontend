import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import uuid from "react-native-uuid";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import ImagePicker from "../components/ImagePicker";
import { auth, db, storage } from "../firebase";

const PostItem = () => {
  const [itemName, setItemName] = useState("");
  const [phoneImageUri, setPhoneImageUri] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [uploadedUri, setUploadedUri] = useState("");

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
      const uri = `gs://${snapshot.metadata.bucket}/${snapshot.metadata.fullPath}`;
      setUploadedUri(uri);
    } catch (err) {
      console.log(err);
    } finally {
      blob.close();
    }
  };

  const addItem = async () => {
    const item = {
      name: itemName,
      description: itemDescription,
      imageUri: uploadedUri,
      owner: auth.currentUser.uid,
    };
    const postItem = await addDoc(collection(db, "items"), item);
    console.log(postItem);
  };

  const handleSubmit = async () => {
    let uploadedImageRef;
    try {
      await uploadImage();
      uploadedImageRef = ref(storage, uploadedUri);
    } catch (err) {
      alert("failed to upload image");
    }
    try {
      await addItem();
      alert("Success");
    } catch (err) {
      try {
        console.log(err);
        await deleteObject(uploadedImageRef);
        console.log("Image deletion succesful");
      } catch {
        console.log("Image deletion failed");
      }
    }
  };

  return (
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
  );
};

export default PostItem;
