import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import img1 from "../../assets/images/photoimg/img1.jpg";
import img2 from "../../assets/images/photoimg/img2.jpg";
import img3 from "../../assets/images/photoimg/img3.jpg";
import img4 from "../../assets/images/photoimg/img4.jpg";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const Repair2 = () => {
  const navigation = useNavigation();
  const nextPage = () => {
    navigation.navigate("Repair3");
  };
  return (
    <SafeAreaView className="bg-white flex-1 ">
      <ScrollView>
        <View className="flex-1 flex-col items-center justify-center space-y-8">
          <View className="w-full flex items-center justify-center mt-12">
            <Text className="font-gbold text-3xl">Fotoğraf/Video Çekimi</Text>
          </View>
          <View className="flex-1 rounded-xl border">
            <Image
              source={img1}
              className="w-72 h-40 rounded-xl "
              resizeMode="contain"
            />
          </View>
          <View className="flex-1 rounded-xl border">
            <Image
              source={img2}
              className="w-72 h-40 rounded-xl"
              resizeMode="contain"
            />
          </View>
          <View className="flex-1 rounded-xl border">
            <Image
              source={img3}
              className="w-72 h-40 rounded-xl"
              resizeMode="contain"
            />
          </View>
          <View className="flex-1 rounded-xl border">
            <Image
              source={img4}
              className="w-72 h-40 rounded-xl"
              resizeMode="contain"
            />
          </View>
          <View className="mb-20">
            <Button
              mode="text"
              onPress={() => nextPage()}
              labelStyle={{
                textDecorationLine: "underline",
                fontSize: 28,
                paddingVertical: 10,
                color: "black",
              }}
            >
              Devam Et
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Repair2;
