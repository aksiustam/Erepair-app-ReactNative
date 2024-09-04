import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useReduxContext } from "../../context/ReduxProvider";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Repair3 = () => {
  const { setPCTamir } = useReduxContext();

  const navigation = useNavigation();

  const getCihaz = async (data) => {
    const formData = {
      id: 0,
      cihaz: data,
      model: "",
      durum: "",
      sorun: [],
    };
    await setPCTamir(formData);

    switch (data) {
      case "bilgisayar":
        navigation.navigate("Repair4");

        break;
      case "laptop":
        navigation.navigate("Repair4");

        break;
      case "telefon":
        navigation.navigate("Repair4");

        break;
      case "tablet":
        navigation.navigate("Repair4");

        break;
      case "yazici":
        navigation.navigate("Repair4");

        break;
      case "monitor":
        navigation.navigate("Repair4");

        break;
      case "diger":
        const formData = {
          id: 0,
          cihaz: data,
          model: {},
          durum: "",
          sorun: [],
        };

        await setPCTamir(formData);
        navigation.navigate("Repair5");

        break;
      case "oyunkonsol":
        navigation.navigate("Repair4");

        break;

      default:
        break;
    }
  };

  const ListData = [
    {
      id: 1,
      href: "bilgisayar",
      text: "Masaüstü Bilgisayar",
      icon: <FontAwesome6 name="computer" size={64} color="white" />,
    },
    {
      id: 2,
      href: "laptop",
      text: "Laptop Bilgisayar",
      icon: <FontAwesome name="laptop" size={64} color="white" />,
    },
    {
      id: 3,
      href: "telefon",
      text: "Telefon",
      icon: <FontAwesome name="mobile-phone" size={64} color="white" />,
    },
    {
      id: 4,
      href: "tablet",
      text: "Tablet",
      icon: <Ionicons name="phone-landscape-sharp" size={64} color="white" />,
    },
    {
      id: 5,
      href: "monitor",
      text: "Monitör",
      icon: <MaterialCommunityIcons name="monitor" size={64} color="white" />,
    },
    {
      id: 6,
      href: "yazici",
      text: "Yazıcı",
      icon: (
        <MaterialCommunityIcons
          name="printer-outline"
          size={64}
          color="white"
        />
      ),
    },
    {
      id: 7,
      href: "oyunkonsol",
      text: "Oyun Konsolu",
      icon: <SimpleLineIcons name="game-controller" size={64} color="white" />,
    },
    {
      id: 8,
      href: "diger",
      text: "Diğer",
      icon: <MaterialIcons name="category" size={64} color="white" />,
    },
  ];
  return (
    <SafeAreaView className="bg-white flex-1 ">
      <View className="w-full h-full flex flex-col items-center justify-start ">
        <View className="px-6 py-2 rounded-full bg-white my-6 ">
          <Text className="text-4xl font-gmedium ">
            Hadi Cihazınızı Seçiniz!
          </Text>
        </View>
        <View className="w-full h-full justify-center items-center mx-2">
          <ScrollView
            contentContainerStyle={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              paddingBottom: 60,
            }}
            style={{ flex: 1 }}
            className="gap-3 px-2"
          >
            {ListData?.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-zinc-900 w-[40%] py-4 flex flex-col items-center justify-center rounded-2xl space-y-4"
                onPress={() => getCihaz(item.href)}
              >
                {item.icon}
                <Text className="text-slate-200 font-gregular text-2xl">
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Repair3;
