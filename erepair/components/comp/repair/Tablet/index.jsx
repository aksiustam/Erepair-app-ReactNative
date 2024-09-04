import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { TabletMarkaData } from "../../../../constant/TelefonMarka";
import { useReduxContext } from "../../../../context/ReduxProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
const TabletPage = () => {
  const [search, setSearch] = useState("");

  const navigation = useNavigation();
  const { pctamir, setPCTamir } = useReduxContext();
  const routePage = async (data) => {
    let bucket = pctamir;
    bucket.model = {};
    bucket.model.marka = data.name;
    await setPCTamir(bucket);
    navigation.navigate("Repair5");
  };

  const filterData =
    search === ""
      ? TabletMarkaData
      : TabletMarkaData.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
  return (
    <View className="flex-1 flex-col items-center justify-center ">
      <View className="flex justify-center items-center mt-6 mb-3 ">
        <Text className="text-4xl font-gmediumitalic text-black">
          Tablet Markası Seçiniz
        </Text>
      </View>
      <View className="w-full px-6 mb-4">
        <Searchbar placeholder="Ara" onChangeText={setSearch} value={search} />
      </View>
      <View className="w-full h-full mx-2">
        <ScrollView
          contentContainerStyle={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: 130,
          }}
          style={{ flex: 1 }}
          className="gap-3"
        >
          {filterData?.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-[40%] border-2 border-zinc-900 rounded-xl flex items-center justify-center"
              onPress={() => routePage(item)}
            >
              <View className="w-28 h-28 flex items-center justify-center">
                {item.img !== null ? (
                  <Image
                    source={item.img}
                    className="w-full h-full rounded-xl "
                    resizeMode="contain"
                  />
                ) : (
                  <Ionicons
                    name="phone-landscape-sharp"
                    size={80}
                    color="black"
                  />
                )}
              </View>
              <Text className="mt-1 text-2xl font-gbolditalic text-zinc-800">
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TabletPage;
