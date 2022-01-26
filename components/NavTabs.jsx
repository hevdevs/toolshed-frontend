import React from "react";

// import HomeScreen from "../screens/HomeScreen";
import UserScreen from "../screens/UserScreen";
import RequestsScreen from "../screens/RequestsScreen";
import InboxScreen from "../screens/InboxScreen";
import ToolshedScreen from "../screens/ToolshedScreen";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PostItem from "../screens/PostItem";

const Tab = createMaterialBottomTabNavigator();

function NavTabs() {
  return (
    <Tab.Navigator initialRouteName="Toolshed" labeled={false}>
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
        name="Post item"
        component={PostItem}
        options={{
          tabBarLabel: "Requests",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default NavTabs;
