import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, createContext, useContext, useEffect } from "react";
import * as Progress from "react-native-progress";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Screens
import OnboardingScreen from "./screens/LoginScreens/OnboardingScreen";
import Register from "./screens/LoginScreens/Register";
import LoginScreen from "./screens/LoginScreens/LoginScreen";
import HomeScreen from "./screens/LoginScreens/HomeScreen";
import ToolshedScreen from "./screens/Toolshed/ToolshedScreen";
import ItemScreen from "./screens/Toolshed/ItemScreen";
import InboxScreen from "./screens/ChatScreens/InboxScreen";
import ToolboardScreen from "./screens/Toolboard/ToolboardScreen";
import UserScreen from "./screens/UserScreens/UserScreen";
import PostItem from "./screens/Toolshed/PostItem";
import PostRequest from "./screens/Toolboard/PostRequest";
import ChatScreen from "./screens/ChatScreens/ChatScreen";
import RequestScreen from "./screens/Toolboard/RequestScreen";
import MapScreen from "./screens/Maps/MapScreen";
import UserForumPostsScreen from "./screens/UserScreens/UserForumPostsScreen"
import UserItemsScreen from "./screens/UserScreens/UserItemsScreen";

const Stack = createNativeStackNavigator();

const AuthenticatedUserContext = createContext({});
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    return unsubscribeAuth;
  }, [user]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Progress.Circle
          size={50}
          indeterminate={true}
          color={"#F36433"}
        />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Toolshed" component={ToolshedScreen} />
      <Stack.Screen name="InboxScreen" component={InboxScreen} />
      <Stack.Screen name="ToolboardScreen" component={ToolboardScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
      <Stack.Screen name="RequestScreen" component={RequestScreen} />
      <Stack.Screen name="PostItem" component={PostItem} />
      <Stack.Screen name="PostRequest" component={PostRequest} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="UserForumPostsScreen" component={UserForumPostsScreen} />
      <Stack.Screen name="UserItemsScreen" component={UserItemsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
