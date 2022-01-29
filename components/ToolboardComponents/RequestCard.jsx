import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

const RequestCard = ({ requests, navigation }) => {
  
  return (
    <View style={styles.cardContainer}>
      {requests.map((req) => {
        return (
          <Pressable onPress={() => navigation.navigate("RequestScreen", { req, navigation })}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{`Looking for: ${req.title} \n \n`}</Text>
              <Text>{`${req.body}`}</Text>
            </View>
          </Pressable>
        )
      })}
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "#9DD9D2",
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
    marginLeft: "5%",
  },
  image: {
    width: 100,
    height: 100,
    padding: 0,
    margin: 0,
  },
});
