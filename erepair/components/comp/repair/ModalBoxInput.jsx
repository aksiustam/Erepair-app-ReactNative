import React, { useState, useEffect, memo } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
// import FormField from "../../FormField";

const ModalBoxInput = memo(({ setModalData, modalData }) => {
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const check = modalData.id === 0;

  useEffect(() => {
    if (marka !== "" || model !== "") {
      setModalData({
        id: 0,
        marka: marka,
        model: model,
        model2: model,
      });
    }
  }, [marka, model, setModalData]);

  return (
    <View
      className={`w-[90%] h-auto rounded-2xl flex flex-col items-center justify-center my-3 mx-4 py-4 border-2 ${
        check ? "bg-zinc-700" : "bg-white"
      }`}
    >
      <View className="w-full h-auto flex items-center justify-center mb-2">
        <Text
          className={`text-3xl font-gregularitalic text-slate-400 ${
            check ? "text-zinc-100" : "text-black"
          }`}
        >
          Başka Marka Modeller
        </Text>
      </View>
      <View className="w-full rounded-xl px-6 mb-2">
        <TextInput
          label="Marka Adı"
          value={marka}
          onChangeText={(text) => setMarka(text)}
        />
      </View>
      <View className="w-full rounded-xl px-6">
        <TextInput
          label="Model Adı/No"
          value={model}
          onChangeText={(text) => setModel(text)}
        />
      </View>
    </View>
  );
});

export default ModalBoxInput;
