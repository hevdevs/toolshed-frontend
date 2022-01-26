import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

const ToolSearch = ({ items, setItems }) => {
  
  const [searchQuery, setSearchQuery] = React.useState("");
  let lowerSearch = searchQuery.toLowerCase();

  const onChangeSearch = (query) => {
    setSearchQuery(query)
  };

  const handleIconPress = () => {
    const itemsArr = [...items];
    let filteredItems = itemsArr.filter((item) => {
      let itemCased = item.name.toLowerCase();
      let regex = new RegExp(`(${lowerSearch})`, 'g');
      return itemCased.match(regex);
    })
    setItems(filteredItems)
    setSearchQuery("");
  };

  return (
    <View>
      <Searchbar
        placeholder="Search the Toolshed"
        value={searchQuery}
        style={styles.container}
        onChangeText={onChangeSearch}
        onIconPress={handleIconPress}
      />
    </View>
  );
};

export default ToolSearch;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    margin: "5%",
  },
})
