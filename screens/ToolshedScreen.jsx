import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import ToolSearch from "../components/ToolshedComponents/ToolSearch";

const ToolshedScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  const handlePress = () => {
    navigation.navigate("PostItem");
  };

  useEffect(() => {
    (async () => {
      try {
        const itemList = await getDocs(collection(db, "items"));
        const itemArray = [];
        itemList.forEach((doc) => itemArray.push(doc.data()));
        setItems(itemArray);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Toolshed</Text>
      <View style={styles.contentContainer}>
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.text}>Post a tool!</Text>
        </Pressable>
        <ScrollView>
          <ToolSearch
            style={styles.bar}
            items={items}
            setItems={setItems}
            navigation={navigation}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default ToolshedScreen;

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
  bar: {
    width: "100%",
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
