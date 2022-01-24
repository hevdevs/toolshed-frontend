import { View, Text } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

const [usernameInput, setUsernameInput] = useState("");

const LoginPage = () => {
  return (
    <View>
        <Text>Username: </Text>
      <TextInput >

      </TextInput>
      
    </View>
  );
};

const styles = StyleSheet.create({

});

export default LoginPage;



