import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

const RequestsScreen = ({ navigation }) => {

  const handlePress = () => {
    navigation.navigate("PostRequest")
  }
    return (
        <View style={styles.container}>
        <Text>Requests screen/Toolboard</Text>
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.text}>Post a request!</Text>
        </Pressable>
    </View>
  );
};

export default RequestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
