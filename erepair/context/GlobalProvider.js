import { createContext, useContext, useState, useEffect } from "react";
import { Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { API_URL } from "../lib/config";
import usePushNotification from "../lib/usePushNotification";
import DeviceInfo from "react-native-device-info";
import { useCameraPermission } from "react-native-vision-camera";
import { PermissionsAndroid } from "react-native";
import { ToastAndroid } from "react-native";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();
  const { hasPermission, requestPermission } = useCameraPermission();

  const [user, setUser] = useState(null);
  const [error, setError] = useState({ login: "", register: "" });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const useUser = async () => {
    try {
      setLoading(true);
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");

      if (authDataSerialized !== null) {
        const _authData = JSON.parse(authDataSerialized);

        setUser(_authData);
        setLogged(true);
      } else {
        setLogged(false);
        setUser(null);
      }
    } catch (error) {
      Alert.alert("Error", error);
    } finally {
      //loading finished
      setLoading(false);
    }
  };
  useEffect(() => {
    useUser();
  }, []);

  const setPerm = async () => {
    setLoading(true);

    const listenToNotifications = () => {
      try {
        const token = getFCMToken();

        setToken(token);
        requestUserPermission();

        onNotificationOpenedAppFromQuit();

        listenToBackgroundNotifications();

        listenToForegroundNotifications();

        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };
    listenToNotifications();

    if (!hasPermission) {
      await requestPermission();
    }

    if (Platform.OS === "android") {
      try {
        if (Platform.Version >= 30) {
          // Android 11+

          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          if (
            grants["android.permission.RECORD_AUDIO"] ===
            PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log("permissions granted");
          } else {
            ToastAndroid.show("İzinler Sağlanamadı", ToastAndroid.LONG);
            return;
          }
        } else {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          if (
            grants["android.permission.WRITE_EXTERNAL_STORAGE"] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants["android.permission.READ_EXTERNAL_STORAGE"] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants["android.permission.RECORD_AUDIO"] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log("permissions granted");
          } else {
            ToastAndroid.show("İzinler Sağlanamadı", ToastAndroid.LONG);
            return;
          }
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    Alert.alert("Başarılı", "İzinler Sağlandı...");

    setLoading(false);
  };
  const signIn = async (formData) => {
    setLoading(true);

    try {
      const deviceID = (await DeviceInfo.getUniqueId()) || null;

      let formData1 = {
        ...formData,
        firebaseToken: token._j || null,
        deviceID: deviceID,
      };
      const response = await axios.post(API_URL + "api/user/login", formData1);
      if (response.data) {
        const userdata = response.data;
        await AsyncStorage.setItem("@AuthData", JSON.stringify(userdata));
        setUser(userdata);
        setLogged(true);
      }
      Alert.alert("Başarılı", "Giriş Yapıldı.");
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError((prev) => ({ ...prev, login: error.response.data.message }));
      }
    } finally {
      setLoading(false);
    }
  };
  const registerUser = async (formData) => {
    setLoading(true);
    try {
      const deviceID = (await DeviceInfo.getUniqueId()) || null;

      let formData1 = {
        ...formData,
        firebaseToken: token._j || null,
        deviceID: deviceID,
      };
      const response = await axios.post(
        API_URL + "api/user/register",
        formData1
      );
      if (response.data) {
        const userdata = response.data;
        await AsyncStorage.setItem("@AuthData", JSON.stringify(userdata));
        setUser(userdata);
        setLogged(true);
      }
      Alert.alert("Başarılı", "Kayıt Olundu...");
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError((prev) => ({
          ...prev,
          register: error.response.data.message,
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        logged,
        setLogged,
        user,
        setUser,
        loading,
        signIn,
        registerUser,
        setPerm,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
