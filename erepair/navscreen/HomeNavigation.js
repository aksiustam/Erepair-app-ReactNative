import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../app/home/HomePage";
import RepairNavigation from "./RepairNavigation";
import { StatusBar } from "react-native";
import AboutPage from "../app/home/AboutPage";
import SizdenGelenlerPage from "../app/home/SizdenGelenlerPage";
import CihazSatPage from "../app/home/CihazSatPage";

const Stack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AboutPage"
          component={AboutPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SizdenGelenlerPage"
          component={SizdenGelenlerPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CihazSatPage"
          component={CihazSatPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RepairNavigation"
          component={RepairNavigation}
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

export default HomeNavigation;
