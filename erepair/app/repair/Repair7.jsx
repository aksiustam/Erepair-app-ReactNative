import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useReduxContext } from "../../context/ReduxProvider";
import { useNavigation } from "@react-navigation/native";
const Repair7 = () => {
  const { pctamir, setPCTamir } = useReduxContext();
  const navigation = useNavigation();

  const getDurum = async (data) => {
    let bucket = pctamir;
    bucket.durum = data;
    await setPCTamir(bucket);
    navigation.navigate("Repair8");
  };

  const durumData = [
    { id: 1, href: "garantili", text: "Garantisi Var" },
    { id: 2, href: "ilkkullanici", text: "İlk Kullanıcı" },
    { id: 3, href: "ikinciel", text: "2.El Cihaz" },
    { id: 4, href: "tamirli", text: "Önceden Tamir Edildi" },
    { id: 5, href: "degismis", text: "Değişiklik Yapılmış" },
    { id: 6, href: "hasarli", text: "Kırık / Hasarlı" },
  ];
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1 flex-col items-center justify-start">
        <View className="px-6 py-2 rounded-full bg-white my-6">
          <Text className="text-4xl font-gmedium text-center">
            Cihazınızın Durumunu Öğrenelim!
          </Text>
        </View>
        <View className="w-full h-full justify-center items-center px-4">
          <ScrollView
            contentContainerStyle={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              paddingBottom: 130,
            }}
            style={{ flex: 1 }}
            className="gap-3 mb-12"
          >
            {durumData.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-zinc-900 w-[40%] h-[18vh] p-4 flex flex-col items-center justify-center rounded-2xl"
                onPress={() => getDurum(item.href)}
              >
                <Text className="text-slate-200 font-gregular text-2xl text-center">
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

export default Repair7;
