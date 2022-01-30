import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailInput,
        passwordInput
      );
      console.log(userCredential);
      const user = userCredential.user;
    } catch (err) {
      console.log(err);
      alert("Login error: Please check your username and password");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/toolbackground.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.welcContents}>
          <Text style={styles.header}>Welcome to your ToolShed</Text>
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
        </View>
      </KeyboardAvoidingView>
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
  },
  welcContents: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -90,
  },
  header: {
    color: "orange",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
    marginTop: "25%",
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
    backgroundColor: "white",
    width: 300,
    alignItems: "center",
    marginTop: "35%",
    position: "relative",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  inputPassword: {
    backgroundColor: "white",
    width: 300,
    marginTop: "5%",
    alignItems: "center",
    position: "relative",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#0782F9",
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
});

export default LoginScreen;
