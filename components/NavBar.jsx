import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "./LoginPage";
import HomePage from "../screens/HomePage";

const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginPage}
        options={{
          tabBarLabel: "Updates",
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
}

export default NavBar;
