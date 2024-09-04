import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const CihazSorunFinish = () => {
  const navigation = useNavigation();
  const nextPage = () => {
    navigation.navigate("Repair7");
  };
  const { height } = Dimensions.get("window");
  return (
    <>
      <View
        style={{ height: height - 100 }}
        className="w-full px-12 flex items-center justify-center"
      >
        <View className="w-full ">
          <View className="py-1 rounded-full bg-white my-3">
            <Text className="text-2xl font-gmedium text-center text-black">
              Seçtiğiniz Tüm Sorunlar Kaydedildi.
            </Text>
          </View>
          <View className="py-1 rounded-full bg-white my-3">
            <Text className="text-2xl font-gmedium text-center text-black">
              Son Aşama Kaldı.
            </Text>
          </View>

          <View className="mt-3">
            <Button mode="contained" onPress={() => nextPage()}>
              Devam Et
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};

export default CihazSorunFinish;
