import { View, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import ItemCard from "./ItemCard";

const ToolSearch = ({ items, navigation }) => {
  
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredTools, setFilteredTools] = useState([]);
  
  let lowerSearch = searchQuery.toLowerCase();

  const onChangeSearch = (query) => {
    setSearchQuery(query)
  };

  const handleIconPress = () => {
    const itemsArr = [...items];
    let filteredItems = itemsArr.filter((item) => {
      let itemCased = item.name.toLowerCase();
      let regex = new RegExp(`(${lowerSearch})`, "g");
      return itemCased.match(regex);
    });
    setFilteredTools(filteredItems);
    setSearchQuery("");;
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search the Toolshed"
        value={searchQuery}
        style={styles.bar}
        onChangeText={onChangeSearch}
        onIconPress={handleIconPress}
      /> 
      <View style={styles.cardContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate("ItemScreen");
          }}
        >
          {filteredTools.map((item, idx) => {
            return <ItemCard item={item} key={idx} />;
          })}
          </Pressable>
        </View>
    </View>
  );
};

export default ToolSearch;

const styles = StyleSheet.create({

  cardContainer: {
    alignContent: "space-between",
    width: "90%",
    margin: "5%",
  },

  bar: {
    width: "100%",
    marginTop: "5%",
  },
});
