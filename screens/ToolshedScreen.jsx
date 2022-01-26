import { StyleSheet, Text, View, Image } from "react-native";
import { db, storage } from "../firebase";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import ItemCard from "../components/ToolshedComponents/ItemCard";

const ToolshedScreen = () => {
  const [items, setItems] = useState([]);

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
      <Text>Toolshed</Text>
      <View style={styles.cardContainer}>
      {items.map((item) => {
        return <ItemCard item={item} />;
      })}
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
  },
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    alignContent: "space-between",
    width: "100%",
    backgroundColor: "grey",
  },
});
