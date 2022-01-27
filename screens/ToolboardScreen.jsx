import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import RequestCard from '../components/ToolboardComponents/RequestCard';

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

  console.log(requests)

  const handlePress = () => {
    navigation.navigate("PostRequest")
  }
    return (
        <View style={styles.container}>
        <Text style={styles.header}>Toolboard</Text>
        <View style={styles.contentContainer}>
          <Pressable style={styles.button} onPress={handlePress}>
            <Text style={styles.text}>Post a request!</Text>
          </Pressable>
          <RequestCard requests={requests} navigation={navigation} />
        </View>
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
    backgroundColor: "#F36433",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
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
  button: {
    backgroundColor: "#F36433",
    margin: "5%",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "#FFF8F0",
  },
});
