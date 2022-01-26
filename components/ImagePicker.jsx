import { View, Button, Image, Text } from "react-native";
import React, { useState } from "react";
import * as ImagePickerPackage from "expo-image-picker";
import { ref, uploadBytes } from "firebase/storage";
import uuid from "react-native-uuid";
import { storage } from "../firebase";

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
      <Button title="Choose image" onPress={pickImage} />
      {phoneImageUri ? (
        <>
          <Image
            source={{ uri: phoneImageUri }}
            style={{ width: 200, height: 200, alignSelf: "center" }}
          />
          {/* <Button title="Upload Image" onPress={handleUpload} /> */}
        </>
      ) : null}
    </View>
  );
};

export default ImagePicker;
