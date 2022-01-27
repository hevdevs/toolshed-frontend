import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, createContext, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Screens
import Register from "./screens/Register";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ToolshedScreen from "./screens/ToolshedScreen";
import ItemScreen from "./screens/ItemScreen";
import InboxScreen from "./screens/InboxScreen";
import ToolboardScreen from "./screens/ToolboardScreen";
import UserScreen from "./screens/UserScreen";
import PostItem from "./screens/PostItem";
import PostRequest from "./screens/PostRequest";
import ChatScreen from "./screens/ChatScreen";
import RequestScreen from "./screens/RequestScreen";

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

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
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
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function HomeStack() {
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
