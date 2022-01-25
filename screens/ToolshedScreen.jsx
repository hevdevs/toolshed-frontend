import { StyleSheet, Text, View, Image } from "react-native";
import { db, storage } from "../firebase";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

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

  console.log(items);

  return (
    <View style={styles.container}>
      <Text>Toolshed</Text>
      {items.map((item) => {
        return <Text>{`\n${item.name}`}</Text>;
      })}
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
});
