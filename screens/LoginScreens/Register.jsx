import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { setLocation } from "../../utils";
import * as Location from "expo-location";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [userLocation, setUserLocation] = useState({
    longitude: -2.238332152375383,
    latitude: 53.4723494112368,
  });
  const [username, setUsername] = useState("");
  const [postcode, setPostcode] = useState("");

  const handleSignUp = async () => {
    const postCodeRegex =
      /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
    if (!postCodeRegex.test(postcode)) alert("Not a valid UK postcode");
    else {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Access to location is required to run app");
        return;
      }
      await setLocation(postcode, setUserLocation);

      if (email !== "" && password !== "") {
        try {
          const newUser = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const docRef = newUser.user.uid;
          let newUserInfo = {
            firstName,
            surname,
            email,
            uid: docRef,
            userLocation,
          };

          const addUserDoc = await setDoc(
            doc(db, "users", docRef),
            newUserInfo
          );
          alert("Sign Up Was Successful");

          const addUsername = await updateProfile(auth.currentUser, {
            displayName: username,
          });
        } catch (err) {
          console.log(err);
          alert(`Sign up unsuccessful! - ${err.msg}`);
        }
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/toolbackground.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <ScrollView>
          <View style={styles.headerContent}>
            <Text style={styles.header}>Create a new account</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Full Name"
              autoCapitalize="none"
              textContentType="name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Username"
              autoCapitalize="none"
              textContentType="name"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Postcode"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="postalCode"
              value={postcode}
              onChangeText={setPostcode}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text style={styles.buttonText}>Go To Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    justifyContent: "center",
    alignItems: "center",
  },
  headerContent: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "12%",
  },
  header: {
    color: "orange",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
    marginTop: "25%",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    width: 300,
    alignItems: "center",
    position: "relative",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  buttonContainer: {
    marginBottom: 15,
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

export default Register;

// header: {
//   color: "orange",
//   fontSize: 30,
//   fontWeight: "bold",
//   textAlign: "center",
//   backgroundColor: "#000000c0",
//   marginTop: "25%",
//   width: "100%",
// },
// inputContainer: {
//   alignContent: "center",
//   justifyContent: "center",
// },
// input: {
//   backgroundColor: "white",
//   paddingHorizontal: 15,
//   paddingVertical: 10,
//   borderRadius: 10,
//   marginTop: 5,
// },
// buttonContainer: {
//   width: "60%",
//   justifyContent: "center",
//   alignItems: "center",
//   marginTop: 40,
// },
// button: {
//   backgroundColor: "#0782f9",
//   width: "100%",
//   padding: 15,
//   borderRadius: 10,
//   alignItems: "center",
// },
// buttonText: {
//   color: "white",
//   fontWeight: "700",
//   fontSize: 16,
// },
// buttonOutline: {
//   backgroundColor: "white",
//   marginTop: 5,
//   borderColor: "#0782f9",
//   borderWidth: 2,
// },
// buttonOutlineText: {
//   color: "white",
//   fontWeight: "700",
//   fontSize: 16,
// },
