import { View, StyleSheet } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";

const ToolSearch = ({ setSearch, search, setSearchQuery }) => {
  const onChangeSearch = (query) => {
    setSearch(query);
  };

  const handleIconPress = () => {
    setSearchQuery(search);
  };

  return (
    <View>
      <Searchbar
        placeholder="Search the Toolshed"
        value={search}
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
