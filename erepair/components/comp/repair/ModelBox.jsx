import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useEffect } from "react";
const ModelBox = ({ data, setModalData, modalData }) => {
  const [select, setSelect] = useState(null);
  const selectData = data?.model?.find((item) => item.value === select);
  const [modeldata, setModelData] = useState(null);

  const check = modalData.id === data.id;

  useEffect(() => {
    if (select !== null || modeldata !== null)
      setModalData({
        id: data.id,
        marka: data.name,
        model: select,
        model2: modeldata,
      });
  }, [data, select, modeldata, setModalData]);
  return (
    <TouchableOpacity
      className={`w-[90%] h-40 rounded-2xl flex flex-row my-3 mx-4 border-2 ${
        check === true ? "bg-zinc-700" : "bg-white"
      }`}
    >
      <View className="w-5/12 h-auto rounded-xl px-2">
        <Image
          source={data.img}
          className="w-full h-full rounded-xl "
          resizeMode="contain"
        />
      </View>
      <View className="w-7/12 h-auto flex-col flex items-center justify-center">
        <Text
          className={`text-3xl font-gbolditalic  ${
            check === true ? "text-zinc-100" : "text-black"
          }`}
        >
          {data.name}
        </Text>
        <View className="w-full h-auto">
          <Picker
            selectedValue={select}
            accessibilityLabel="Model Seçiniz"
            onValueChange={(itemValue, itemIndex) => setSelect(itemValue)}
          >
            {data?.model?.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.value} />
            ))}
          </Picker>
        </View>
        <View className="w-full h-auto">
          <Picker
            selectedValue={modeldata}
            accessibilityLabel="Model Seçiniz"
            onValueChange={(itemValue, itemIndex) => setModelData(itemValue)}
          >
            {selectData?.data?.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.value} />
            ))}
          </Picker>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ModelBox;
