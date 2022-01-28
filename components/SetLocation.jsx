import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import * as Location from "expo-location";
import MapComponent from "./MapComponent";

const SetLocation = ({ setUserLocation, userLocation }) => {
  const [showMap, setShowMap] = useState(false);
  const [postCode, setPostCode] = useState("");

  const northCoders = {
    longitude: -2.238332152375383,
    latitude: 53.4723494112368,
  };

  const fetchLocation = async () => {
    const coords = await Location.geocodeAsync(`${postCode}`);
    setLocation({
      longitude: coords[0].longitude,
      latitude: coords[0].latitude,
    });
  };

  const submitPostCode = async () => {
    if (!postCodeRegex.test(postCode)) alert("Bad postcode");
    else fetchLocation();
  };

  const postCodeRegex =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

  return (
    <View>
      <Text>postCode </Text>
      <TextInput
        value={postCode}
        onChangeText={setPostCode}
        placeholder="Enter postcode"
      />
      <Button title="Submit" onPress={submitPostCode} />
      <Button title="Show map" onPress={() => setShowMap((curr) => !curr)} />
      {showMap ? <MapComponent location={location} /> : null}
    </View>
  );
};

export default SetLocation;
