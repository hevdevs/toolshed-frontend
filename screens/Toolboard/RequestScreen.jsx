import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

const RequestScreen = ({ route, navigation }) => {
  
  const { req } = route.params;
  console.log(req)
  
  return (
    <View style={styles.container}>
      <Text>{`${req.title}`}</Text>
      <Text>{`${req.body}`}</Text>
      <Text>{`${req.category}`}</Text>
      <Text>{`${req.userInfo.userFirstName}`}</Text>
      <Text>{`${req.userInfo.userSurname}`}</Text>
      <Text>{`${req.timestamp.date} ${req.timestamp.time}`}</Text>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>Back to toolboard</Text>
      </Pressable>
    </View>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
  }
});
