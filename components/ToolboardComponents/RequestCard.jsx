import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import uuid from "react-native-uuid";

import AppLoading from "expo-app-loading";
import {
  Oxygen_400Regular,
  Oxygen_700Bold,
  useFonts,
} from "@expo-google-fonts/oxygen";

const RequestCard = ({ requests, navigation }) => {
  let [fontsLoaded] = useFonts({
    Oxygen_400Regular,
    Oxygen_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.cardContainer}>
      {requests.length
        ? requests.map((req) => {
            return (
              <Pressable
                key={uuid.v4()}
                onPress={() =>
                  navigation.navigate("RequestScreen", { req, navigation })
                }
              >
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>
                    <Ionicons
                      name={"help-circle"}
                      size={16}
                      color={"#F36433"}
                    />
                    {` Looking for: ${req.title}`}
                  </Text>
                  <Text style={styles.bodyText}>{`"${req.body}"`}</Text>
                  <Text
                    style={styles.cardText}
                  >{`Posted by ${req.userInfo.userUsername}`}</Text>
                </View>
              </Pressable>
            );
          })
        : null}
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "#9DD9D2",
    fontFamily: "Oxygen_400Regular",
  },
  card: {
    width: "90%",
    padding: "5%",
    borderRadius: 5,
    margin: "5%",
    backgroundColor: "#FFF8F0",
  },
  cardText: {
    marginRight: 0,
  },
  cardTitle: {
    fontFamily: "Oxygen_700Bold",
    fontSize: 16,
    color: "#F36433",
  },
  image: {
    width: 100,
    height: 100,
    padding: 0,
    margin: 0,
  },
  bodyText: {
    margin: 0,
    fontFamily: "Oxygen_700Bold",
    fontStyle: "italic",
  },
});
