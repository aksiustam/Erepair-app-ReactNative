import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useReduxContext } from "../../../../context/ReduxProvider";
import { useNavigation } from "@react-navigation/native";
import windows from "../../../../assets/images/model/laptop/windows.png";
import apple from "../../../../assets/images/model/laptop/apple.png";
const BilgisayarPage = () => {
  const navigation = useNavigation();
  const { pctamir, setPCTamir } = useReduxContext();
  const routePage = async (data) => {
    let bucket = pctamir;
    bucket.model = {};
    bucket.model.marka = data;
    await setPCTamir(bucket);
    navigation.navigate("Repair5");
  };

  return (
    <View className="flex-1 flex-col items-center justify-center ">
      <View className="flex justify-center items-center mt-6 mb-3 ">
        <Text className="text-4xl font-gmediumitalic text-black">
          Bilgisayar İşletim Sistemi Seçiniz
        </Text>
      </View>

      <View className="w-full h-[86vh] mx-2">
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
          <TouchableOpacity
            className="w-[40%] border-2 border-zinc-600 rounded-xl flex items-center justify-center"
            onPress={() => routePage("Windows")}
          >
            <View className="w-28 h-28 flex items-center justify-center">
              <Image
                source={windows}
                className="w-full h-full rounded-xl "
                resizeMode="contain"
              />
            </View>
            <Text className="mt-1 pb-2 text-3xl font-gbolditalic text-zinc-800">
              Windows
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[40%] border-2 border-zinc-600 rounded-xl flex items-center justify-center"
            onPress={() => routePage("Apple")}
          >
            <View className="w-28 h-28 flex items-center justify-center">
              <Image
                source={apple}
                className="w-full h-full rounded-xl "
                resizeMode="contain"
              />
            </View>
            <Text className="mt-1 pb-2 text-3xl font-gbolditalic text-zinc-800">
              Apple
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default BilgisayarPage;
