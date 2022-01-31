import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import * as Progress from "react-native-progress";

const ToolSearch = ({ items, setFilteredTools, filteredTools }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  let lowerSearch = searchQuery.toLowerCase();

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const handleIconPress = () => {
    const itemsArr = [...items];
    setIsLoading(true);
    let filteredItems = itemsArr.filter((item) => {
      let itemCased = item.name.toLowerCase();
      let regex = new RegExp(`(${lowerSearch})`, "g");
      return itemCased.match(regex);
    });
    setFilteredTools(filteredItems);
    setSearchQuery("");
    setIsLoading(false)
  };

  return (
    <View>
      <Searchbar
        placeholder="Search the Toolshed"
        value={searchQuery}
        style={styles.bar}
        onChangeText={onChangeSearch}
        onIconPress={handleIconPress}
      />
    </View>
  );
};

export default ToolSearch;

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    marginTop: "5%",
  },
  spinner: {
    marginTop: "25%",
  },
});
