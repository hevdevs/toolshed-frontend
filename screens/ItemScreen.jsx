import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";

// components
import NavTabs from "../components/NavTabs";

const ItemScreen = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Toolshed</Text>
        <Image style={styles.image} source={{ uri: item.uri }} />
        <Text>{item.name}</Text>
        <Text>{item.userInfo.userFirstName}</Text>
        <Text>{item.userInfo.userSurname}</Text>                  
        <Text>{item.description}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("ChatScreen");
          }}
          itemOwner={item.owner}
        >
          <Text>Click here to send a direct message</Text>
        </TouchableOpacity>
      </View>
      <NavTabs />
    </SafeAreaView>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD9D2",
  },
  header: {
    margin: "5%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF8F0",
  },
  button: {
    backgroundColor: "#F36433",
    margin: "5%",
    padding: 10,
    borderRadius: 5,
  },
  image: {
    justifyContent: "center",
  },
});
