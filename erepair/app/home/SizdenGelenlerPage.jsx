import { View, Text, FlatList, Dimensions, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const imagePaths = {
  1: require("../../assets/images/sizdengelenler/image1.jpg"),
  2: require("../../assets/images/sizdengelenler/image2.jpg"),
  3: require("../../assets/images/sizdengelenler/image3.jpg"),
  4: require("../../assets/images/sizdengelenler/image4.jpg"),
  5: require("../../assets/images/sizdengelenler/image5.jpg"),
  6: require("../../assets/images/sizdengelenler/image6.jpg"),
  7: require("../../assets/images/sizdengelenler/image7.jpg"),
  8: require("../../assets/images/sizdengelenler/image8.jpg"),
  9: require("../../assets/images/sizdengelenler/image9.jpg"),
  10: require("../../assets/images/sizdengelenler/image10.jpg"),
  11: require("../../assets/images/sizdengelenler/image11.jpg"),
  12: require("../../assets/images/sizdengelenler/image12.jpg"),
  13: require("../../assets/images/sizdengelenler/image13.jpg"),
  14: require("../../assets/images/sizdengelenler/image14.jpg"),
  15: require("../../assets/images/sizdengelenler/image15.jpg"),
  16: require("../../assets/images/sizdengelenler/image16.jpg"),
  17: require("../../assets/images/sizdengelenler/image17.jpg"),
  18: require("../../assets/images/sizdengelenler/image18.jpg"),
  19: require("../../assets/images/sizdengelenler/image19.jpg"),
  20: require("../../assets/images/sizdengelenler/image20.jpg"),
  21: require("../../assets/images/sizdengelenler/image21.jpg"),
  22: require("../../assets/images/sizdengelenler/image22.jpg"),
  23: require("../../assets/images/sizdengelenler/image23.jpg"),
  24: require("../../assets/images/sizdengelenler/image24.jpg"),
  25: require("../../assets/images/sizdengelenler/image25.jpg"),
  26: require("../../assets/images/sizdengelenler/image26.jpg"),
  27: require("../../assets/images/sizdengelenler/image27.jpg"),
  28: require("../../assets/images/sizdengelenler/image28.jpg"),
  29: require("../../assets/images/sizdengelenler/image29.jpg"),
  30: require("../../assets/images/sizdengelenler/image30.jpg"),
  31: require("../../assets/images/sizdengelenler/image31.jpg"),
  32: require("../../assets/images/sizdengelenler/image32.jpg"),
  33: require("../../assets/images/sizdengelenler/image33.jpg"),
  34: require("../../assets/images/sizdengelenler/image34.jpg"),
  35: require("../../assets/images/sizdengelenler/image35.jpg"),
  36: require("../../assets/images/sizdengelenler/image36.jpg"),
  37: require("../../assets/images/sizdengelenler/image37.jpg"),
  38: require("../../assets/images/sizdengelenler/image38.jpg"),
  39: require("../../assets/images/sizdengelenler/image39.jpg"),
  40: require("../../assets/images/sizdengelenler/image40.jpg"),
  41: require("../../assets/images/sizdengelenler/image41.jpg"),
  42: require("../../assets/images/sizdengelenler/image42.jpg"),
  43: require("../../assets/images/sizdengelenler/image43.jpg"),
  44: require("../../assets/images/sizdengelenler/image44.jpg"),
  45: require("../../assets/images/sizdengelenler/image45.jpg"),
  46: require("../../assets/images/sizdengelenler/image46.jpg"),
  47: require("../../assets/images/sizdengelenler/image47.jpg"),
  48: require("../../assets/images/sizdengelenler/image48.jpg"),
  49: require("../../assets/images/sizdengelenler/image49.jpg"),
  50: require("../../assets/images/sizdengelenler/image50.jpg"),
  51: require("../../assets/images/sizdengelenler/image51.jpg"),
  52: require("../../assets/images/sizdengelenler/image52.jpg"),
};

const SizdenGelenlerPage = () => {
  const images = Array.from({ length: 52 }, (_, index) => ({
    id: index + 1,
    uri: imagePaths[index + 1],
  }));

  const renderCard = (item) => {
    return (
      <View className="w-screen flex justify-center items-center">
        <View className="w-full h-full px-4 py-2 ">
          <Image
            source={item}
            className="w-full h-full rounded-xl "
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView className="bg-white w-full h-full">
      <View className="flex-1 flex flex-col items-center justify-center">
        <View className="w-full h-[45vh]">
          <FlatList
            data={images}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderCard(item.uri)}
            horizontal
            snapToInterval={Dimensions.get("window").width}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            decelerationRate={0.2}
            scrollEventThrottle={32}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SizdenGelenlerPage;
