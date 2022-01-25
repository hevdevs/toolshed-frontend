import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ToolshedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Toolshed</Text>
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
