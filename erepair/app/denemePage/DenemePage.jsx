import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import RadioBox from "../../components/radioBox";

const DenemePage = () => {
  const [bilgicheck, setBilgiCheck] = useState(false);
  try {
    return (
      <View className="w-full h-auto border-b-[0.5px]">
        <Text className="font-gregular text-xl ">
          Hangi Windows u tercih edersiniz ?
        </Text>
        <RadioBox
          items={[
            { name: "Windows 11", value: "Win11" },
            { name: "Windows 10", value: "Win10" },
            { name: "Windows 7", value: "Win7" },
          ]}
          selected={bilgicheck}
          onSelected={(value) => {
            setBilgiCheck(value);
          }}
        />
      </View>
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export default DenemePage;
// import Share from "react-native-share";

// const shareOptions = {
//   title: "Share Zip File",
//   url: `file://${zipPath}`, // Make sure to use 'file://' prefix
//   type: "application/zip",
//   subject: "Your Zip File", // optional
// };

// await Share.open(shareOptions);
