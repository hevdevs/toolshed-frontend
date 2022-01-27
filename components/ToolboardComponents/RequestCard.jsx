import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

const RequestCard = ({ requests, navigation }) => {
  
  const handlePress = () => {
    ;
  }

  return (
    <View style={styles.cardContainer}>
      {requests.map((req) => {
        return (
          <Pressable onPress={() => navigation.navigate("RequestScreen", { req, navigation })}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{`${req.title} \n \n`}</Text>
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
    alignContent: "space-between",
    width: "90%",
    margin: "5%",
  },
  card: {
    flexDirection: "row",
    width: "100%",
    padding: "5%",
    borderRadius: 5,
    marginBottom: "5%",
    backgroundColor: "#FFF8F0",
  },
  cardTitle: {
    marginRight: 0,
    marginLeft: "5%",
    color: "#F36443",
    fontWeight: "bold",
  },
});
