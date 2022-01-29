import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import { auth, db } from "../../firebase.js";
import { collection, getDocs } from "firebase/firestore";

import SignOut from '../../components/SignOut.jsx';

const UserScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const itemList = await getDocs(collection(db, "items"));
        const itemArray = [];
        itemList.forEach((doc) => {
          console.log(doc)
          itemArray.push(Object.assign({ uid: doc.id }, doc.data()));
        });
        setItems(itemArray);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);


  return (
      <View style={styles.container}>
      <Text style={styles.header}>User Page</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.welcome}>Welcome, {auth.currentUser.email}</Text>
        <View style={styles.userInfo}>
          <Text>Profile pic: {auth.currentUser.photoURL}</Text>
          <Text>Name: {auth.currentUser.displayName}</Text>
        </View>
        <SignOut />
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
  }
});
