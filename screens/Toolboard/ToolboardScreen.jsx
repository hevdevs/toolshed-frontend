import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import RequestCard from "../../components/ToolboardComponents/RequestCard";
import ActionButton from "react-native-action-button";


const ToolboardScreen = ({ navigation }) => {

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const requestList = await getDocs(collection(db, "requests"));
        const requestArray = [];
        requestList.forEach((doc) => requestArray.push(doc.data()));
        setRequests(requestArray);
      } catch (err) {
        console.log(err)
      }
    })()
  }, []);

  const handlePress = () => {
    navigation.navigate("PostRequest")
  }
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Toolboard</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.contentContainer}>
            <RequestCard requests={requests} navigation={navigation} />
          </View>
        </ScrollView>
        <ActionButton buttonColor="#F36433">
          <ActionButton.Item onPress={handlePress} title={"Post a Request"}>
            <Ionicons name={"help-circle"} size={24} color={"white"} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
};

export default ToolboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#9DD9D2",
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
  },
  header: {
    margin: "5%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF8F0",
    alignSelf: "center",
  },
  contentContainer: {
    marginTop: "40%",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#9DD9D2",
  },
  button: {
    backgroundColor: "#F36433",
    margin: "5%",
    padding: 10,
    borderRadius: 35,
    position: "relative",
    bottom: 0,
    alignSelf: "flex-end",
  },
  scroll: {
    padding: 0,
    margin: 0,
  },
  text: {
    color: "#FFF8F0",
    fontWeight: "bold",
    fontSize: 30,
  },
});
