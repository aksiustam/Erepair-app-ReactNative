import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import Repair1 from "../app/repair/Repair1";
import Repair2 from "../app/repair/Repair2";
import Repair3 from "../app/repair/Repair3";
import Repair4 from "../app/repair/Repair4";
import Repair5 from "../app/repair/Repair5";

import Repair8 from "../app/repair/Repair8";
import Repair6 from "../app/repair/Repair6";
import Repair7 from "../app/repair/Repair7";
import Repair9 from "../app/repair/Repair9";

const Stack = createNativeStackNavigator();

const RepairNavigation = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Repair1"
          component={Repair1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Repair2"
          component={Repair2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Repair3"
          component={Repair3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Repair4"
          component={Repair4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Repair5"
          component={Repair5}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Repair6"
          component={Repair6}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Repair7"
          component={Repair7}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Repair8"
          component={Repair8}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Repair9"
          component={Repair9}
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

export default RepairNavigation;
