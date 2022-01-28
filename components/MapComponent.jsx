import { View, Text } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import { useState } from "react";

const MapComponent = ({ location, draggable = false }) => {
  const [mapReady, setMapReady] = useState(false);

  return (
    <MapView
      key={(location.latitude, location.longitude)}
      provider={PROVIDER_GOOGLE}
      onMapLoaded={() => setMapReady(true)}
      style={{ width: "100%", height: "100%" }}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {mapReady ? (
        <Marker
          draggable={draggable}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          onDragEnd={(e) => {
            const { x: loc } = { x: e.nativeEvent.coordinate };
            setLocation(loc);
          }}
          title={`${location.longitude.toFixed(3)}, ${location.latitude.toFixed(
            3
          )}`}
        />
      ) : null}
    </MapView>
  );
};

export default MapComponent;
