import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import * as Progress from "react-native-progress";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import AppLoading from "expo-app-loading";
import { Oxygen_400Regular, Oxygen_700Bold, useFonts } from "@expo-google-fonts/oxygen";

const LoginScreen = ({ navigation }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailInput,
        passwordInput
      );
      console.log(userCredential);
      const user = userCredential.user;
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false)
      alert("Login error: Please check your username and password");
    }
  };

  let [fontsLoaded] = useFonts({
    Oxygen_400Regular, Oxygen_700Bold,
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground
      source={require("../../assets/toolbackground.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.wrapper}>
        <View style={styles.welcContents}>
          <Text style={styles.header}>Welcome to your Toolshed</Text>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.icon}
          />
        </View>

        <View style={styles.formContainer} behavior="padding">
          <TextInput
            style={styles.inputEmail}
            placeholder={"Email"}
            textContentType="emailAddress"
            keyboardType="email-address"
            value={emailInput}
            onChangeText={setEmailInput}
          />

          <TextInput
            style={styles.inputPassword}
            value={passwordInput}
            placeholder={"Password"}
            textContentType="password"
            onChangeText={setPasswordInput}
            secureTextEntry={true}
          />
          
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          {isLoading ? <Progress.Circle
            size={50}
            indeterminate={true}
            style={styles.spinner}
            color={"#F36433"}
          /> : null}
        </View>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8F0",
    top: 90,
    borderRadius: 5,
    width: "90%",
    margin: "5%",
    fontFamily: "Oxygen_400Regular",
  },
  welcContents: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -90,
  },
  header: {
    color: "#575761",
    fontSize: 30,
    fontFamily: "Oxygen_700Bold",
    textAlign: "center",
    marginTop: "10%",
  },
  icon: {
    height: 100,
    width: 100,
  },
  formContainer: {
    alignItems: "center",
    margin: 10,
  },
  inputEmail: {
    backgroundColor: "#F0F0F0",
    width: 300,
    alignItems: "center",
    marginTop: "35%",
    position: "relative",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  inputPassword: {
    backgroundColor: "#F0F0F0",
    width: 300,
    marginTop: "5%",
    alignItems: "center",
    position: "relative",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#F36433",
    width: 125,
    marginTop: "5%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  spinner: {
    marginTop: "5%",
  },
});

export default LoginScreen;
