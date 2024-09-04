import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { LightTheme } from "./constant/PaperTheme";
import GlobalProvider from "./context/GlobalProvider";
import ReduxProvider from "./context/ReduxProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Killed state notification.", remoteMessage);
});

export default function Main() {
  const theme = {
    ...DefaultTheme,
    colors: LightTheme.colors, // Copy it from the color codes scheme and then use it here
  };
  return (
    <GlobalProvider>
      <ReduxProvider>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <GestureHandlerRootView
              style={{
                flex: 1,
              }}
            >
              <App />
            </GestureHandlerRootView>
          </PaperProvider>
        </SafeAreaProvider>
      </ReduxProvider>
    </GlobalProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
