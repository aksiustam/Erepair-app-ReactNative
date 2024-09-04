import { View, Text, Alert, FlatList } from "react-native";
import React, { useState } from "react";

import ModelBox from "../ModelBox";
import ModalBoxInput from "../ModalBoxInput";

import { useReduxContext } from "../../../../context/ReduxProvider";
import { useNavigation } from "@react-navigation/native";
import LaptopMarkaModel from "../../../../constant/LaptopMarkaModel";
import { Button, Searchbar } from "react-native-paper";

const LaptopPage = () => {
  const [search, setSearch] = useState("");
  const [modalData, setModalData] = useState({ id: 1 });
  const { pctamir, setPCTamir } = useReduxContext();

  const navigation = useNavigation();
  const setPage = async () => {
    if (
      modalData?.marka === "" ||
      modalData?.model === "" ||
      modalData?.model2 === ""
    ) {
      Alert.alert("Hata", "Bir Marka/Model Seçiniz.");
      return;
    }

    let bucket = pctamir;
    bucket.model = {};
    bucket.model = modalData;

    await setPCTamir(bucket);
    navigation.navigate("Repair5");
  };
  const filterMarkaModel =
    search === ""
      ? LaptopMarkaModel
      : LaptopMarkaModel.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
  return (
    <View className="flex-1 flex-col items-center justify-start">
      <View className="flex justify-center items-center mt-4 mb-4">
        <Text className="text-4xl font-gmediumitalic text-black">
          Marka Model Seçiniz
        </Text>
      </View>
      <View className="w-full px-6 mb-4">
        <Searchbar placeholder="Ara" onChangeText={setSearch} value={search} />
      </View>
      <View className="w-full h-[60vh] justify-center items-center mx-4 ">
        <FlatList
          data={filterMarkaModel}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <ModalBoxInput modalData={modalData} setModalData={setModalData} />
          }
          renderItem={({ item }) => (
            <ModelBox
              data={item}
              modalData={modalData}
              setModalData={setModalData}
            />
          )}
        />
      </View>
      <View className="mt-12 mx-auto">
        <Button mode="elevated" onPress={() => setPage()} className="w-40">
          Devam Et
        </Button>
      </View>
    </View>
  );
};

export default LaptopPage;
