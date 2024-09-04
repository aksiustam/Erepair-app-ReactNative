import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const Repair1 = () => {
  const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const [check, setCheck] = useState(false);
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const currentId = viewableItems[0].item.id;
      setCheck(currentId === array.length);
    }
  };

  const renderCard = (id) => {
    switch (id) {
      case 1:
        return (
          <View className="w-screen flex justify-center items-center">
            <View className="w-72 h-72 px-4 py-2 bg-white rounded-xl flex items-center justify-center border-2 border-gray-500">
              <Text className="text-2xl font-gmedium text-center mb-4">
                E-Repair ile cihazınızın bilgilerini girdikten ve fotoğraflarını
                çektikten sonra, cihazınızı bize kargo ile gönderip kontrol
                ettirebilirsiniz.
              </Text>
              <Text className="text-2xl font-gmedium text-center mb-4">
                Ardından, uzman ekibimiz cihazınızın arızasını tespit edip en
                iyi şekilde tamir edilebilir.
              </Text>
              <View className="flex-row gap-1">
                <View
                  className={`w-2 h-2 rounded-full ${
                    id === 1 ? "bg-black" : "bg-[#989899]"
                  }`}
                ></View>
                <View
                  className={`w-2 h-2 rounded-full ${
                    id === 2 ? "bg-black" : "bg-[#989899]"
                  }`}
                ></View>
                <View
                  className={`w-2 h-2 rounded-full ${
                    id === 3 ? "bg-black" : "bg-[#989899]"
                  }`}
                ></View>
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View className="w-screen flex justify-center items-center">
            <View className="w-72 h-72 px-4 py-2 bg-white rounded-xl flex items-center justify-center border-2 border-gray-500">
              <Text className="text-xl font-gmedium text-center mb-4">
                Tamir işlemi için cihazınızın dört adet fotoğrafını ve bir
                videosunu çekip bize göndermeniz gerekmektedir. Dilerseniz, ses
                kaydı ile de cihazınızın arızasını anlatabilirsiniz.
              </Text>
              <Text className="text-xl font-gmedium text-center mb-4">
                Cihazınızın marka ve modelini seçtikten sonra genel arızasını
                belirterek işleme devam edebilirsiniz.
              </Text>
              <View className="flex-row gap-1">
                <View
                  className={`w-2 h-2 rounded-full ${
                    id === 1 ? "bg-black" : "bg-[#989899]"
                  }`}
                ></View>
                <View
                  className={`w-2 h-2 rounded-full ${
                    id === 2 ? "bg-black" : "bg-[#989899]"
                  }`}
                ></View>
                <View
                  className={`w-2 h-2 rounded-full ${
                    id === 3 ? "bg-black" : "bg-[#989899]"
                  }`}
                ></View>
              </View>
            </View>
          </View>
        );

      case 3:
        return (
          <>
            <View className="w-screen flex justify-center items-center">
              <View className="w-72 h-72 px-4 py-2 bg-white rounded-xl flex items-center justify-center border-2 border-gray-500">
                <Text className="text-xl font-gmedium text-center mb-4">
                  İşlem bittikten sonra, cihazınızı kargoya vererek veya elden
                  teslim ederek profilinizden işlem sonucunu takip
                  edebilirsiniz.
                </Text>
                <Text className="text-xl font-gmedium text-center mb-4">
                  Cihazınız bize ulaştıktan sonra, değerlendirme yapıp en kısa
                  sürede size geri dönüş yapacağız. Teşekkürler!
                </Text>
                <View className="flex-row gap-1">
                  <View
                    className={`w-2 h-2 rounded-full ${
                      id === 1 ? "bg-black" : "bg-[#989899]"
                    }`}
                  ></View>
                  <View
                    className={`w-2 h-2 rounded-full ${
                      id === 2 ? "bg-black" : "bg-[#989899]"
                    }`}
                  ></View>
                  <View
                    className={`w-2 h-2 rounded-full ${
                      id === 3 ? "bg-black" : "bg-[#989899]"
                    }`}
                  ></View>
                </View>
              </View>
            </View>
          </>
        );

      default:
        break;
    }
  };
  const navigation = useNavigation();
  const nextPage = () => {
    navigation.navigate("Repair2");
  };
  return (
    <SafeAreaView className="bg-white flex-1 ">
      <View className="flex-1 flex flex-col items-center justify-center">
        <View className="w-full h-[42vh]">
          <FlatList
            data={array}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderCard(item.id)}
            horizontal
            snapToInterval={Dimensions.get("window").width}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            decelerationRate={0.2}
            scrollEventThrottle={32}
          />
        </View>

        {check === true ? (
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
        ) : (
          ""
        )}
      </View>
    </SafeAreaView>
  );
};

export default Repair1;
