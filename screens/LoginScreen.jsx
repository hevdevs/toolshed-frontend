import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase";
import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { CurrentRenderContext } from "@react-navigation/native";
import Register from "./Register";

const LoginScreen = ({navigation}) => {
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
    <View style={styles.container}>
      <TextInput
        style={styles.inputEmail}
        placeholder={"Email"}
        value={emailInput}
        onChangeText={setEmailInput}
      />
      <TextInput
        style={styles.inputPassword}
        value={passwordInput}
        placeholder={"Password"}
        onChangeText={setPasswordInput}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.button}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputEmail: {
    backgroundColor: "grey",
    width: "75%",
    alignItems: "center",
    marginTop: "50%",
    position: "relative",
  },
  inputPassword: {
    backgroundColor: "grey",
    width: "75%",
    alignItems: "center",
    marginTop: "5%",
    position: "relative",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "30%",
    marginTop: "5%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default LoginScreen;
