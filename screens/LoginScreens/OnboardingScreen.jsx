import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text, Pressable, StyleSheet , Image} from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = ({navigation}) => {
    return (
      <Onboarding
        onSkip={() => navigation.navigate("LoginScreen")}
        onDone={() => navigation.navigate("Register")}
        pages={[
          {
            backgroundColor: "#fff8f0",
            image: (
              <Image
                style={styles.image}
                source={require("../../assets/icon.png")}
              />
            ),
            title: (<Text style={styles.header}>Toolshed</Text>),
            subtitle: "",
          },
          {
            backgroundColor: "#fff8f0",
            image: (
              <Image
                style={styles.image}
                source={require("../../assets/onboarding-1.png")}
              />
            ),
            title: "Borrow what you need",
            subtitle:
              "By posting a request to our toolboard, we connect you to other users in your local area who are willing to loan you whatever you're after.",
          },
          {
            backgroundColor: "#fff8f0",
            image: (
              <Image
                style={styles.image}
                source={require("../../assets/onboarding-2.png")}
              />
            ),
            title: "Lend what you don't",
            subtitle:
              "Lending out items not only gives you good karma, it helps connect you with your community and builds your Toolshed rating.",
          },
          {
            backgroundColor: "#fff8f0",
            image: (
              <Image
                style={styles.image}
                source={require("../../assets/onboarding-3.png")}
              />
            ),
            title: "Build it together",
            subtitle: "We help you and your neighbours get the tools that you need to achieve your goals. Saving your cash and reducing waste are just a bonus!",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: 250,
  },
  header: {
    fontWeight: "bold",
    fontSize: 60,
    alignSelf: "center",
    position: "absolute",
    bottom: 250,
    color: "#575761",
  },
});