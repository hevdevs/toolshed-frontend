import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";

// import HomeScreen from "../screens/HomeScreen";
import UserScreen from "../screens/UserScreen";
import RequestsScreen from "../screens/RequestsScreen";
import InboxScreen from "../screens/InboxScreen";
import ToolshedScreen from "../screens/ToolshedScreen";

const Tab = createMaterialBottomTabNavigator();

function NavTabs() {
  return (
    <Tab.Navigator
      style={styles.bar}
      initialRouteName="Toolshed"
      labeled={false}
      barStyle={{ backgroundColor: "#2DC2BD" }}
      activeColor="#FFF8F0"
    >
      <Tab.Screen
        name="Toolshed"
        component={ToolshedScreen}
        options={{
          tabBarLabel: "Toolshed",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: "My Page",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          tabBarLabel: "Requests",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="help" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default NavTabs;

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "#F36433",
  },
});
