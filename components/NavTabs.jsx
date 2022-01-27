import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// import HomeScreen from "../screens/HomeScreen";
import UserScreen from "../screens/UserScreen";
import ToolboardScreen from "../screens/ToolboardScreen";
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
          tabBarIcon: ({ color }) => {
            return <Ionicons name={"home"} size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: "My Page",
          tabBarIcon: ({ color }) => {
            return <Ionicons name={"person"} size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Toolboard"
        component={ToolboardScreen}
        options={{
          tabBarLabel: "Requests",
          tabBarIcon: ({ color }) => {
            return <Ionicons name={"hand-left"} size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color }) => {
            return <Ionicons name={"mail"} size={24} color={color} />;
          },
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
