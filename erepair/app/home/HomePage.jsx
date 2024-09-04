import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton, MD3Colors } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useReduxContext } from "../../context/ReduxProvider";

const HomePage = () => {
  const routePage = [
    // {
    //   id: 1,
    //   text: 'Cihaz Tamir Etmek İstiyorum',
    //   href: 'RepairNavigation',
    // },
    {
      id: 2,
      text: "Size Nasıl Güvenebilirim",
      href: "AboutPage",
    },
    {
      id: 3,
      text: "Sizden Gelenler",
      href: "SizdenGelenlerPage",
    },
    {
      id: 4,
      text: "Cihazımı Satmak İstiyorum",
      href: "CihazSatPage",
    },
    {
      id: 5,
      text: "Eskisini Ver Yenisini Al",
      href: "/home",
    },
    {
      id: 6,
      text: "Teknik Destek",
      href: "/home",
    },
    {
      id: 7,
      text: "Sabit Fiyat Listesi",
      href: "/home",
    },
    {
      id: 8,
      text: "Cihaz Satışı ( 0-2.el )",
      href: "/home",
      disable: true,
    },
  ];
  const navigation = useNavigation();
  const { setLogged } = useGlobalContext();

  const clear = () => {
    AsyncStorage.clear();

    setLogged(false);
  };

  const denemePage = () => {
    navigation.navigate("DenemePage");
  };
  const chatPage = () => {
    navigation.navigate("ChatPage");
  };
  return (
    <SafeAreaView className="bg-white w-full h-full">
      <View className=" w-full h-full relative ">
        <TouchableOpacity
          className="absolute top-8 left-12"
          onPress={() => clear()}
        >
          <View className="w-12 h-12 bg-slate-900 flex items-center justify-center rounded-xl">
            <Text className="text-slate-200">Reset</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="absolute top-4 right-36"
          onPress={denemePage}
        >
          <IconButton icon="camera" iconColor={MD3Colors.error50} size={55} />
        </TouchableOpacity>

        <TouchableOpacity
          className="absolute top-8 right-12"
          onPress={chatPage}
        >
          <Ionicons name="chatbox-ellipses-outline" size={55} color="red" />
        </TouchableOpacity>

        <View className="flex-1 flex flex-col items-center justify-center space-y-6 px-12">
          <TouchableOpacity
            className="w-full h-12 bg-primary-800 rounded-full flex items-center justify-center "
            onPress={() =>
              navigation.navigate("RepairNavigation", { screen: "Repair3" })
            }
          >
            <Text className="text-slate-200 font-gregular text-2xl ">
              Cihaz Tamir Etmek İstiyorum
            </Text>
          </TouchableOpacity>
          {routePage.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-full h-12 bg-primary-800 rounded-full flex items-center justify-center "
              disabled={item?.disable}
              onPress={() => navigation.navigate(item.href)}
            >
              <Text className="text-slate-200 font-gregular text-2xl ">
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
