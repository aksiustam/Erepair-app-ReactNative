import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginHome from "../app/auth/LoginHome";
import LoginPage from "../app/auth/Login";
import RegisterPage from "../app/auth/Register";
import { StatusBar } from "react-native";
const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginHome"
          component={LoginHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"rgb(255, 255, 255)"}
      />
    </>
  );
};

export default AuthNavigation;
