import { View, Text } from 'react-native';
import React from 'react';
import MapComponent from '../components/MapComponent';

export default MapScreen = ({route}) => {

    const northCoders = {
        longitude: -2.238332152375383,
        latitude: 53.4723494112368,
      };
    
  return (
    <View>
      <MapComponent location={northCoders}></MapComponent>
    </View>
  );
}
