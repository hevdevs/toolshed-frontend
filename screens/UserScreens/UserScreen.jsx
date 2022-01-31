import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase.js";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";

// components
import UserRequests from "../../components/UserRequests.jsx";
import UserItems from "../../components/UserItems.jsx";
import SignOut from "../../components/SignOut.jsx";

const UserScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [userDoc, setUserDoc] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [display, setDisplay] = useState(false);

  const user = auth.currentUser;

  useEffect(async () => {
    try {
      const userInfo = await getDoc(doc(db, "users", user.uid));
      setUserDoc(userInfo.data());
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleDisplayItems = () => {
    setDisplay(false);
  };

  const handleDisplayRequests = () => {
    setDisplay(true);
  };

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
          <Text>Number of Items for Lend</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDisplayItems}>
            <Text style={styles.buttonText}>Your Listed Items</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleDisplayRequests}
          >
            <Text style={styles.buttonText}>Your Forum Posts</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.cards}>
            {display === false ? <UserItems /> : <UserRequests />}
          </View>
        </ScrollView>
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
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0782f9",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },

  cards: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
});
