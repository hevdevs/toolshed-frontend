import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Picker,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import uuid from "react-native-uuid";

import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import dayjs from "dayjs";

import ImagePicker from "../../components/ImagePicker";

import AppLoading from "expo-app-loading";
import {
  Oxygen_400Regular,
  Oxygen_700Bold,
  useFonts,
} from "@expo-google-fonts/oxygen";

const PostItem = ({ navigation, route }) => {
  const [itemName, setItemName] = useState("");
  const [phoneImageUri, setPhoneImageUri] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("DIY");
  const [isItemUploading, setIsItemUploading] = useState(false);

  const { setNewItem } = route.params;

  const categories = [
    "DIY",
    "Household",
    "Kitchen",
    "Electronics",
    "Arts and Crafts",
    "Garden",
    "Furniture",
  ];

  const resetState = () => {
    setItemName("");
    setPhoneImageUri("");
    setItemDescription("");
    setSelectedCategory("DIY");
  };

  const uploadImage = async () => {
    setIsItemUploading(true);
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
      setIsItemUploading(false);
      return uri;
    } catch (err) {
      setIsItemUploading(false);
      alert("Image failed to upload!");
      console.log(err);
    }
  };

  const addItem = async (uploadedUri) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const fields = docSnap.data();
    const item = {
      name: itemName,
      description: itemDescription,
      imageUri: uploadedUri,
      category: selectedCategory,
      userInfo: {
        userUid: auth.currentUser.uid,
        userFirstName: fields.firstName,
        userSurname: fields.surname,
        userLocation: fields.userLocation,
        userUsername: auth.currentUser.displayName,
      },
      timestamp: {
        date: dayjs().format("DD/MM/YY"),
        time: dayjs().format("HH:mm"),
        fullStamp: dayjs().format(),
      },
      available: true,
    };
    const postItem = await addDoc(collection(db, "items"), item);
    await updateDoc(doc(db, "items", postItem.id), {
      itemUid: postItem.id,
    });
    setNewItem((currNewItem) => {
      !currNewItem;
    });
  };

  const handleSubmit = async () => {
    const uploadedUri = await uploadImage();
    const uploadedImageRef = ref(storage, uploadedUri);
    try {
      await addItem(uploadedUri);
      alert("Request successfully posted!");
      resetState();
      navigation.goBack();
    } catch (err) {
      if (uploadedUri) await deleteObject(uploadedImageRef);
      alert("Request failed to post!");
    }
  };

  let [fontsLoaded] = useFonts({
    Oxygen_400Regular,
    Oxygen_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Lend an Item</Text>
      </View>
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.subheader}>Enter item name</Text>
          <TextInput
            style={styles.input}
            placeholder="Item name"
            value={itemName}
            onChangeText={setItemName}
          />
          <Text style={styles.subheader}>Enter item description</Text>
          <TextInput
            style={styles.input}
            placeholder="Item description"
            value={itemDescription}
            onChangeText={setItemDescription}
          />
          <Text style={styles.subheader}>Select an item category</Text>
          <TouchableOpacity style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              placeholder="Select Item Category"
              selectedCategory={selectedCategory}
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
          <ImagePicker
            style={styles.button}
            phoneImageUri={phoneImageUri}
            setPhoneImageUri={setPhoneImageUri}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={handleSubmit}
            disabled={!phoneImageUri || !itemName}
          >
            <Text style={styles.text}>Submit!</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.text}>Go Back</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#9DD9D2",
    fontFamily: "Oxygen_400Regular",
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
    fontFamily: "Oxygen_700Bold",
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
    margin: "2%",
    backgroundColor: "#2DC2DB",
    width: 150,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#F36433",
    margin: "2.5%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 75,
    bottom: 0,
  },
  text: {
    color: "#FFF8F0",
    fontFamily: "Oxygen_400Regular",
  },
  subheader: {
    alignSelf: "center",
    color: "#172121",
    fontFamily: "Oxygen_700Bold",
    fontSize: 20,
    marginBottom: "2%",
    borderBottomColor: "#172121",
    borderBottomWidth: 1,
  },
});
