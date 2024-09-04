import { Alert, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const navigation = useNavigation();

  const { loading, error, signIn } = useGlobalContext();

  const [email, setEmail] = useState("aksiustam@gmail.com");
  const [password, setPassword] = useState("1234");
  const [showpass, setShowPass] = useState(true);

  const setAuth = async () => {
    if (email === "" && pass === "") {
      Alert.alert("Hata");
      return;
    }
    const formData = {
      email: email,
      password: password,
    };
    await signIn(formData);
  };

  const setNav = () => {
    navigation.navigate("RegisterPage");
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <View className="w-full h-12 px-12 mt-12">
          <View className="flex-1 bg-primary-500 rounded-full flex flex-row border-2 border-primary-600">
            <TouchableOpacity
              className={`flex-1 flex items-center justify-center rounded-l-full border-r-2 border-slate-200 bg-zinc-900 `}
            >
              <Text className="text-slate-200 font-gregular text-2xl">
                Giriş Yap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 flex items-center justify-center rounded-r-full"
              onPress={() => setNav()}
            >
              <Text className="text-slate-200 font-gregular text-2xl">
                Kayıt Ol
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 flex flex-col items-center justify-start relative mt-8">
          <View className="my-10 flex flex-col items-center justify-center">
            <Text className="text-5xl font-gbold text-black">Giriş Yap</Text>
            <Text className="text-xl font-gbold text-red-600 pt-6">
              {error?.login}
            </Text>
          </View>
          <View className="w-full px-12 py-2">
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View className="w-full px-12 py-2">
            <TextInput
              label="Şifre"
              secureTextEntry={showpass}
              value={password}
              onChangeText={(text) => setPassword(text)}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setShowPass(!showpass)}
                />
              }
            />
          </View>
          <View className="w-full px-12 py-4 items-center">
            <Button
              icon="login"
              mode="contained"
              onPress={() => setAuth()}
              labelStyle={{ fontSize: 18 }}
              loading={loading}
              className="w-60 py-1 bg-zinc-900"
            >
              Giriş Yap
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginPage;
