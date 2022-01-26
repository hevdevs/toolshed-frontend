import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-web";
import { TouchableOpacity } from "react-native";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = () => console.log(searchInput);

  return (
    <View>
      <TextInput
        placeholder="Search"
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
