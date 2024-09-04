import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import CheckBox from "react-native-check-box";

export const RadioButton = ({ item, selected, onSelected }) => {
  return (
    <TouchableOpacity
      onPress={() => onSelected(item.value)}
      className="w-full h-auto flex flex-row items-center justify-between py-1 "
      activeOpacity={0.7}
    >
      <Text className="font-gregular text-xl">{item.name}</Text>

      <CheckBox
        isChecked={selected === item.value}
        onClick={() => onSelected(item.value)}
        style={{ marginRight: 12 }}
      />
    </TouchableOpacity>
  );
};
const RadioBox = ({ items, selected, onSelected }) => {
  return (
    <View className="w-full h-auto justify-center items-center ">
      {items?.map((item) => (
        <RadioButton
          key={item.value}
          item={item}
          selected={selected}
          onSelected={onSelected}
        />
      ))}
    </View>
  );
};

export default RadioBox;
