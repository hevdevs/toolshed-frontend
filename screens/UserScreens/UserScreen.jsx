import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
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
  const [itemDisplay, setItemDisplay] = useState(false);
  const [reqDisplay, setReqDisplay] = useState(false);

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
    setItemDisplay((currDisplay) => !currDisplay);
    setReqDisplay(false);
  };

  const handleDisplayRequests = () => {
    setReqDisplay((currDisplay) => !currDisplay);
    setItemDisplay(false);
  };

  const handleSignOut = async () => {
    try {
      const signOut = await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Welcome, {auth.currentUser.displayName}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <Pressable style={styles.button1} onPress={handleDisplayItems}>
            <Text style={styles.text}>
              {`Your Listed Items  `}
              <Text style={styles.arrow}>
                <Ionicons
                  name={"caret-down-circle"}
                  size={16}
                  color={"white"}
                />
              </Text>
            </Text>
          </Pressable>
          {itemDisplay ? <UserItems /> : null}
          <Pressable style={styles.button2} onPress={handleDisplayRequests}>
            <Text style={styles.text}>
              {`Your Forum Posts  `}
              <Text style={styles.arrow}>
                <Ionicons
                  name={"caret-down-circle"}
                  size={16}
                  color={"white"}
                />
              </Text>
            </Text>
          </Pressable>
          {reqDisplay ? <UserRequests /> : null}
        </ScrollView>
      </View>
      <ActionButton buttonColor="#F36433">
        <ActionButton.Item onPress={handleSignOut} title={"Log Out"}>
          <Ionicons name={"exit"} size={24} color={"white"} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#9DD9D2",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  headerContainer: {
    paddingTop: "10%",
    backgroundColor: "#F36433",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 0,
    flexDirection: "row",
  },
  header: {
    margin: "5%",
    marginTop: "10%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF8F0",
    alignSelf: "center",
  },
  contentContainer: {
    marginTop: "40%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#9DD9D2",
  },
  button1: {
    backgroundColor: "#F36433",
    margin: "5%",
    marginBottom: 0,
    padding: 10,
    borderRadius: 5,
    position: "relative",
    bottom: 0,
    alignItems: "center",
  },
  button2: {
    backgroundColor: "#F36433",
    margin: "5%",
    marginTop: 0,
    marginBottom: 0,
    padding: 10,
    borderRadius: 5,
    position: "relative",
    bottom: 0,
    alignItems: "center",
  },
  text: {
    color: "#FFF8F0",
    fontWeight: "bold",
    fontSize: 16,
  },
  progressPie: {
    alignSelf: "center",
  },
  arrow: {
    alignSelf: "flex-end",
  },
});
