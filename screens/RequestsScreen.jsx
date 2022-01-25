import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const RequestsScreen = () => {
    return (
        <View style={styles.container}>
      <Text>Requests screen/Toolboard</Text>
    </View>
  );
};

export default RequestsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:  "center",
    }
});
