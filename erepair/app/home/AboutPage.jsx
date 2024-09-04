import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AboutPage = () => {
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
            <View className="w-80 h-80 px-4 py-2 bg-white rounded-xl flex items-center justify-center border-2 border-gray-500">
              <Text className="text-2xl font-gmedium text-center mb-4">
                E-repair cihaz tamir uygulaması, elektronik cihazlarınızın
                tamiri için güvenilir ve kullanıcı dostu bir platform sunar.
                Bilgisayar, tablet, telefon, laptop, yazıcı, oyun konsolu gibi
                çeşitli cihazlarınızda karşılaştığınız teknik sorunları çözmek
                için geliştirilmiş olan bu uygulama, tamir sürecini başlatmayı
                son derece kolay hale getirir.
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
            <View className="w-80 h-80 px-4 py-2 bg-white rounded-xl flex items-center justify-center border-2 border-gray-500">
              <Text className="text-xl font-gmedium text-center mb-1">
                Cihaz bilgilerinizi ve hasarın net bir şekilde görüldüğü
                fotoğrafları uygulama üzerinden girdikten sonra, sizin için en
                uygun kargo seçenekleri oluşturulur.
              </Text>
              <Text className="text-xl font-gmedium text-center mb-5">
                Cihazınızı güvenle bize gönderdikten sonra, uzman teknik
                ekibimiz, cihazınızı en yüksek kalite standartlarında titizlikle
                tamir eder ve sizlere hızlı bir şekilde geri ulaştırır.
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
              <View className="w-80 h-80 px-4 py-2 bg-white rounded-xl flex items-center justify-center border-2 border-gray-500">
                <Text className="text-xl font-gmedium text-center mb-4">
                  E-repair, cihaz tamir sürecinizi kolaylaştırarak, hem zaman
                  kazandırır hem de size kesintisiz bir teknoloji deneyimi
                  sunar. Güvenilir, hızlı ve pratik hizmet anlayışımızla,
                  teknoloji sorunlarınızı en aza indiriyoruz.
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
        <View className="w-full h-[45vh]">
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
      </View>
    </SafeAreaView>
  );
};

export default AboutPage;
