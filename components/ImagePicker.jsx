import { View, Pressable, Image, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as ImagePickerPackage from "expo-image-picker";

const ImagePicker = ({ phoneImageUri, setPhoneImageUri }) => {
  const pickImage = async () => {
    let result = await ImagePickerPackage.launchImageLibraryAsync({
      mediaTypes: ImagePickerPackage.MediaTypeOptions.All,
      allowsEditing: true,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoneImageUri(result.uri);
    }
  };

  return (
    <View>
      <Text>{"\n\n\n\n"}</Text>
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.text}>Upload a Photo</Text>
      </Pressable>
      {phoneImageUri ? (
        <>
          <Image
            source={{ uri: phoneImageUri }}
            style={{ width: 200, height: 200, alignSelf: "center" }}
          />
          <Pressable style={styles.button} onPress={() => setPhoneImageUri("")}>
            <Text style={styles.text}>Pick a Different Photo</Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    backgroundColor: "#F36433",
    margin: "5%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "50%",
  },
  text: {
    color: "#FFF8F0",
    fontWeight: "bold",
  },
});