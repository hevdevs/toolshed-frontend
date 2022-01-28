import { View, Text } from 'react-native';
import React from 'react';
import MapComponent from '../components/MapComponent';

export default MapScreen = ({route}) => {

  const {item} = route.params;

  console.log(item);

    const northCoders = {
        longitude: -2.238332152375383,
        latitude: 53.4723494112368,
      };
    
  return (
    <View>
      <MapComponent location={item.location || northCoders}></MapComponent>
    </View>
  );
}
