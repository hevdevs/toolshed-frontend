import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";

import { auth, db } from "../../firebase.js";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";

import SignOut from "../../components/SignOut.jsx";

const UserScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [userDoc, setUserDoc] = useState({});

  const user = auth.currentUser;

  const handleListedItems = () => {
    navigation.navigate("UserItemsScreen");
  };

  const handleForumPosts = () => {
    navigation.navigate("UserForumPostsScreen");
  };

useEffect( async () => {
    try {
      const userInfo = await getDoc(doc(db, "users", user.uid))
      setUserDoc(userInfo.data())
    } catch (err) {
    console.log(err)
    
  }
}, [])

console.log(userDoc);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const itemList = await getDocs(collection(db, "items"));
  //       const itemArray = [];
  //       itemList.forEach((doc) => {
  //         console.log(doc);
  //         itemArray.push(Object.assign({ uid: doc.id }, doc.data()));
  //       });
  //       setItems(itemArray);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Page</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.welcome}>
          Welcome, {auth.currentUser.displayName}
        </Text>
        <View style={styles.userInfo}>
          <Text>Profile pic: {auth.currentUser.photoURL}</Text>
          <Text>Name: {auth.currentUser.displayName}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
          style={styles.button}
          onPress={handleListedItems}>
            <Text style={styles.buttonText}>Listed Items</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={handleForumPosts}>
            <Text style={styles.buttonText}>Forum Posts</Text>
            </TouchableOpacity>
        <SignOut />
        </View>
      </View>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F36433",
    width: "100%",
  },
  header: {
    margin: "5%",
    marginTop: "10%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF8F0",
  },
  contentContainer: {
    width: "100%",
    padding: 0,
    margin: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD9D2",
  },
  welcome: {
    fontWeight: "bold",
    fontSize: 20,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 50,
  },
  button: {
    backgroundColor: "#0782f9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },
});
