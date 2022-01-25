import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import auth from "../firebase";

const Register = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        if (email !== "" && password !== "") {
            try {
                const newUser = await createUserWithEmailAndPassword(auth, email, password);
            }
            catch (err) {
                alert("Signup error: Please choose a password that is 6 characters long");
            }
        }
    }
    return (
        <KeyboardAvoidingView behavior="padding">
            <Text>Create a new account</Text>
            <View>
                <TextInput placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={email}
                onChangeText={(text) => setEmail(text)}/>
                <TextInput placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={(text) => setPassword(text)}/>
            </View>
            <TouchableOpacity onPress={handleSignUp}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
        >
          <Text>Go To Login</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default Register;