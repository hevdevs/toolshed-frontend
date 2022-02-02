import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import AppLoading from "expo-app-loading";
import * as Progress from "react-native-progress";

import {
  Oxygen_400Regular,
  Oxygen_700Bold,
  useFonts,
} from "@expo-google-fonts/oxygen";
import { auth, db } from "../../firebase.js";
import {
  getDoc,
  getDocs,
  doc,
  collection,
  where,
  query,
} from "firebase/firestore";

// components
import UserRequests from "../../components/UserRequests.jsx";
import UserItems from "../../components/UserItems.jsx";
import SignOut from "../../components/SignOut.jsx";

const UserScreen = () => {
  const [userDoc, setUserDoc] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [itemDisplay, setItemDisplay] = useState(false);
  const [reqDisplay, setReqDisplay] = useState(false);
  const [items, setItems] = useState([]);
  const [postRequests, setPostRequests] = useState([]);
  const [isItemDeleted, setIsItemDeleted] = useState(false);
  const [isRequestDeleted, setIsRequestDeleted] = useState(false);

  const user = auth.currentUser;

  useEffect(async () => {
    try {
      const userInfo = await getDoc(doc(db, "users", user.uid));
      setUserDoc(userInfo.data());
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(async () => {
    try {
      setIsItemDeleted(false);
      setIsLoading(true);
      const q = query(
        collection(db, "items"),
        where("userInfo.userUid", "==", user.uid)
      );
      const items = await getDocs(q);
      const itemsArr = [];

      items.forEach((item) => {
        itemsArr.push(item.data());
      });
      setItems(itemsArr);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [isItemDeleted]);

  useEffect(async () => {
    try {
      setIsLoading(true);
      setIsRequestDeleted(false);
      const q = query(
        collection(db, "requests"),
        where("userInfo.userUid", "==", user.uid)
      );
      const requests = await getDocs(q);
      const requestArr = [];
      requests.forEach((doc) => {
        requestArr.push(doc.data());
      });
      setPostRequests(requestArr);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [isRequestDeleted]);

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
      alert("You have now signed out");
    } catch (err) {
      alert(err);
    }
  };

  let [fontsLoaded] = useFonts({
    Oxygen_400Regular,
    Oxygen_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const starRating = (items) => {
    const itemsCopy = [...items];
    const starArr = itemsCopy.map((item) => {
      return <>⭐️</>;
    });
    return starArr;
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
          <View style={styles.bio}>
            <View style={styles.subheaderContainer}>
              <Text style={styles.subheader}>Your Stats</Text>
            </View>
            <Text style={styles.bodyText}>
              {`Rank: `}
              {starRating(items)}
            </Text>
            <Text
              style={styles.bodyText}
            >{`Posted ${items.length} items to the toolshed`}</Text>
            <Text
              style={styles.bodyText}
            >{`Made ${postRequests.length} requests to the toolboard`}</Text>
          </View>
          <Pressable style={styles.button1} onPress={handleDisplayItems}>
            <Text style={styles.text}>
              {`Your Listed Items  `}
              <Text style={styles.arrow}>
                {itemDisplay ? (
                  <Ionicons
                    name={"caret-up-circle"}
                    size={16}
                    color={"white"}
                  />
                ) : (
                  <Ionicons
                    name={"caret-down-circle"}
                    size={16}
                    color={"white"}
                  />
                )}
              </Text>
            </Text>
          </Pressable>
          {itemDisplay ? (
            isLoading ? (
              <Progress.Circle
                size={50}
                indeterminate={true}
                style={styles.progressPie}
                color={"#F36433"}
              />
            ) : (
              <UserItems setIsItemDeleted={setIsItemDeleted} items={items} />
            )
          ) : null}
          <Pressable style={styles.button2} onPress={handleDisplayRequests}>
            <Text style={styles.text}>
              {`Your Forum Posts  `}
              <Text style={styles.arrow}>
                {reqDisplay ? (
                  <Ionicons
                    name={"caret-up-circle"}
                    size={16}
                    color={"white"}
                  />
                ) : (
                  <Ionicons
                    name={"caret-down-circle"}
                    size={16}
                    color={"white"}
                  />
                )}
              </Text>
            </Text>
          </Pressable>
          {reqDisplay ? (
            isLoading ? (
              <Progress.Circle
                size={50}
                indeterminate={true}
                style={styles.progressPie}
                color={"#F36433"}
              />
            ) : (
              <UserRequests
                setIsRequestDeleted={setIsRequestDeleted}
                postRequests={postRequests}
              />
            )
          ) : null}
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
    fontFamily: "Oxygen_700Bold",
  },
  subheaderContainer: {
    borderBottomColor: "#172121",
    borderBottomWidth: 1,
    width: "80%",
    alignItems: "center",
    marginBottom: "3%",
  },
  subheader: {
    color: "#172121",
    fontFamily: "Oxygen_700Bold",
    fontSize: 20,
    marginBottom: "3%",
  },
  contentContainer: {
    marginTop: "40%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#9DD9D2",
  },
  bio: {
    backgroundColor: "#FFF8F0",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    margin: "5%",
    borderRadius: 5,
    padding: "5%",
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
  bodyText: {
    fontSize: 16,
    color: "#172121",
    fontFamily: "Oxygen_700Bold",
  },
  bodyDesc: {
    fontSize: 16,
    color: "#172121",
    fontFamily: "Oxygen_700Bold",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: "5%",
  },
});
