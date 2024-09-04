import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./navscreen/AuthNavigation";
import HomeNavigation from "./navscreen/HomeNavigation";
import { useGlobalContext } from "./context/GlobalProvider";
import CameraPage from "./app/cameraPage/CameraPage";
import { MediaPage } from "./app/cameraPage/MediaPage";
import DenemePage from "./app/denemePage/DenemePage";
import ChatPage from "./app/chatPage";

const Stack = createNativeStackNavigator();

const App = () => {
  const { loading, logged } = useGlobalContext();
  const check = !loading && logged;

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthNavigation">
          {check === false ? (
            <Stack.Screen
              name="AuthNavigation"
              component={AuthNavigation}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="HomeNavigation"
                component={HomeNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DenemePage"
                component={DenemePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ChatPage"
                component={ChatPage}
                options={{
                  headerShown: true,
                  headerTitle: "Destek Ekibimiz",
                  animation: "slide_from_bottom",
                  presentation: "transparentModal",
                }}
              />
              <Stack.Screen
                name="Camera"
                component={CameraPage}
                options={{
                  headerShown: false,
                  presentation: "transparentModal",
                  autoHideHomeIndicator: true,
                  navigationBarHidden: true,
                }}
              />
              <Stack.Screen
                name="MediaPage"
                component={MediaPage}
                options={{
                  headerShown: false,
                  animation: "none",
                  presentation: "transparentModal",
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;
