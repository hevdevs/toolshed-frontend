import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PostRequest = () => {
  return (
    <View style={styles.container}>
      <Text>post request</Text>
    </View>
  );
};

export default PostRequest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});
