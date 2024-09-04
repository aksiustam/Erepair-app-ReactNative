import { Alert, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";

const RegisterPage = () => {
  const navigation = useNavigation();

  const { loading, error, registerUser } = useGlobalContext();

  const [name, setName] = useState("Ahmet Kılıç");
  const [email, setEmail] = useState("aksiustam@gmail.com");
  const [pass, setPass] = useState("1234");
  const [showpass, setShowPass] = useState(true);

  const setRegister = async () => {
    if (name === "" && email === "" && pass === "") {
      Alert.alert("Hata", "Alanları Doldurun!");
      return;
    }
    const formData = {
      name: name,
      email: email,
      pass: pass,
    };
    await registerUser(formData);
  };
  const setNav = () => {
    navigation.navigate("LoginPage");
  };
  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <View className="w-full h-12 px-12 mt-12">
          <View className="flex-1 bg-primary-500 rounded-full flex flex-row border-2 border-primary-600">
            <TouchableOpacity
              className={`flex-1 flex items-center justify-center rounded-l-full border-r-2 border-slate-200 `}
              onPress={() => setNav()}
            >
              <Text className="text-slate-200 font-gregular text-2xl">
                Giriş Yap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 flex items-center justify-center rounded-r-full bg-zinc-900 `}
            >
              <Text className="text-slate-200 font-gregular text-2xl">
                Kayıt Ol
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 flex flex-col items-center justify-start relative mt-8">
          <View className="my-4 flex flex-col items-center justify-center">
            <Text className="text-5xl font-gbold text-black">Kayıt Ol</Text>
            <Text className="text-xl font-gbold text-red-600 pt-6">
              {error?.register}
            </Text>
          </View>

          <View className="w-full px-12 py-2">
            <TextInput
              label="Ad Soyad"
              value={name}
              onChangeText={(text) => setName(text)}
            />
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
              value={pass}
              onChangeText={(text) => setPass(text)}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setShowPass(!showpass)}
                />
              }
            />
          </View>
          <View className="w-full px-12 py-2 items-center">
            <Button
              icon="login"
              mode="contained"
              onPress={() => setRegister()}
              labelStyle={{ fontSize: 18 }}
              loading={loading}
              className="w-60 py-1 bg-zinc-900"
            >
              Kayıt Ol
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RegisterPage;
