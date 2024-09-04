import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const LoginHome = () => {
  const navigation = useNavigation();

  const { loading, setPerm } = useGlobalContext();

  const getPermission = async () => {
    await setPerm();
    navigation.replace("LoginPage");
  };

  return (
    <>
      <SafeAreaView className="bg-white flex-1">
        <View className="flex-1 flex flex-col items-center justify-center space-y-6">
          <View className="w-24 h-24 bg-zinc-900 rounded-3xl flex items-center justify-center">
            <Text className="text-slate-100 text-2xl font-gbold">E-Repair</Text>
          </View>
          <View className="flex flex-col items-center justify-center">
            <Text className="text-black text-5xl font-gbold">
              ... HOŞGELDİNİZ ...
            </Text>
          </View>
          <View className="flex flex-col items-center justify-center">
            <Text className="text-black text-2xl font-gbold">
              Hadi Bildirimleri ve İzinleri Ayarlayalım.
            </Text>
          </View>

          <Button
            icon="login"
            mode="contained"
            onPress={getPermission}
            labelStyle={{ fontSize: 18 }}
            loading={loading}
            className="w-60 py-1 bg-zinc-900"
          >
            Başla
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginHome;
