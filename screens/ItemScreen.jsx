import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ItemScreen = () => {
  return (
      <View style={styles.container}>
          <Text>Super cool item screen aw yes</Text>
      </View>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
