import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useReduxContext } from "../../context/ReduxProvider";
import {
  checkTextBilgisayar,
  checkTextMonitor,
  checkTextOyunKonsolu,
  checkTextTelefon,
  checkTextYazici,
} from "../../constant/SorunText";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import CheckBox from "react-native-check-box";

const Repair5 = () => {
  const { pctamir, setPCTamir } = useReduxContext();

  const getCihazSorun = () => {
    const cihaz = pctamir.cihaz;

    switch (cihaz) {
      case "bilgisayar":
        return checkTextBilgisayar;
      case "laptop":
        return checkTextBilgisayar;

      case "telefon":
        return checkTextTelefon;

      case "tablet":
        return checkTextTelefon;

      case "monitor":
        return checkTextMonitor;

      case "yazici":
        return checkTextYazici;

      case "oyunkonsol":
        return checkTextOyunKonsolu;

      case "diger":
        return checkTextBilgisayar;
    }
  };
  const [items, setItems] = useState(getCihazSorun());

  const handleCheckboxChange = (id) => {
    setItems((prevItems) => {
      const selectedCount = prevItems.filter((item) => item.checked).length;

      return prevItems.map((item) => {
        if (item.id === id) {
          if (!item.checked && selectedCount >= 3) {
            return item;
          }
          return { ...item, checked: !item.checked };
        }
        return item;
      });
    });
  };

  const getCheckedValues = () => {
    return items
      .filter((item) => item.checked)
      .map((item) => {
        return { name: item.value, check: false };
      });
  };
  const navigation = useNavigation();

  const getPage = async () => {
    let bucket = pctamir;
    bucket.sorun = [];
    bucket.sorun = getCheckedValues();
    await setPCTamir(bucket);
    navigation.navigate("Repair6");
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(items?.length / itemsPerPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const calculateIndexRange = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const { startIndex, endIndex } = calculateIndexRange();
  const pagiData = items.slice(startIndex, endIndex);

  return (
    <SafeAreaView className="bg-white  flex-1">
      <View className="flex-1 flex-col flex items-center justify-start">
        <View className="px-6 py-2 rounded-full bg-white my-6">
          <Text className="text-4xl font-gmedium text-center">
            Seçeneklerden en fazla 3 tanesini seçiniz !
          </Text>
        </View>
        <View className="w-full h-[68vh] justify-center items-center mx-4">
          <ScrollView
            contentContainerStyle={{
              flexWrap: "nowrap",
              flexDirection: "col",
              justifyContent: "center",
            }}
            style={{ flex: 1, marginBottom: 30 }}
            className="px-6 space-y-3"
          >
            {pagiData.map((item) => (
              <TouchableOpacity
                key={item.id}
                className={"w-full py-4 px-2 bg-white"}
                activeOpacity={0.7}
                onPress={() => handleCheckboxChange(item.id)}
              >
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-2xl font-gmedium w-[90%]">
                    {item.name}
                  </Text>
                  <CheckBox
                    isChecked={item.checked}
                    onClick={() => {
                      handleCheckboxChange(item.id);
                    }}
                  />
                </View>
                <View className="w-full h-[1px] bg-black shadow-lg shadow-black" />
              </TouchableOpacity>
            ))}

            <View className="w-full pt-8 mb-6">
              <View className="flex flex-row items-center justify-center space-x-5">
                {pageNumbers?.map((item) => (
                  <TouchableOpacity
                    key={item}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl border-[0.1px] shadow-xl ${
                      page === item ? "bg-zinc-900" : "bg-zinc-200"
                    }`}
                    onPress={() => setPage(item)}
                  >
                    <Text
                      className={`text-2xl font-gbold ${
                        page === item ? "text-zinc-100" : "text-zinc-900"
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
        <Button
          mode="elevated"
          onPress={() => getPage()}
          contentStyle={{ paddingHorizontal: 22, paddingVertical: 4 }}
          className=" flex items-center justify-center"
        >
          Devam Et
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Repair5;
