import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { useReduxContext } from "../../context/ReduxProvider";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { useCameraPermission } from "react-native-vision-camera";
const PhotoPage = () => {
  const { media, setMedia } = useReduxContext();

  const navigation = useNavigation();
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraPage = async () => {
    if (!hasPermission) {
      await requestPermission().then(navigation.navigate("Camera"));
    } else {
      navigation.navigate("Camera");
    }
  };
  const deleteMedia = (props) => {
    if (props.type === "image") {
      const updatedImages = media.images.filter(
        (image) => image.uri !== props.uri
      );
      setMedia((prevMedia) => ({
        ...prevMedia,
        images: updatedImages,
      }));
    } else {
      setMedia((prevMedia) => ({
        ...prevMedia,
        video: null,
      }));
    }
  };
  const editMedia = (props) => {
    setMedia((prevMedia) => ({
      ...prevMedia,
      editMedia: props,
    }));

    navigation.navigate("Camera");
  };
  return (
    <View className="w-full h-32 py-1 px-2 rounded-xl border border-primary-500">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row" }}
        contentContainerStyle={{ flexGrow: 1 }}
        className="w-full"
      >
        {media?.images?.map((item, index) => (
          <View key={index} className="w-28 h-full mx-2 relative">
            <View className="absolute z-10 top-0 w-full px-2 py-1">
              <View className="flex flex-row items-center justify-between">
                <TouchableOpacity onPress={() => deleteMedia(item)}>
                  <FontAwesome6 name="xmark" size={22} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editMedia(item)}>
                  <AntDesign name="edit" size={22} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <Image
              source={{ uri: item.uri }}
              resizeMode="cover"
              className="w-28 h-full rounded-xl"
            />
          </View>
        ))}
        {media?.video != null && (
          <View className="w-28 h-full mx-2 relative">
            <View className="absolute z-20 top-0 w-full px-2 py-1">
              <View className="flex flex-row items-center justify-between">
                <TouchableOpacity onPress={() => deleteMedia(media?.video)}>
                  <FontAwesome6 name="xmark" size={22} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editMedia(media?.video)}>
                  <AntDesign name="edit" size={22} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <Image
              source={{ uri: media?.video?.uri }}
              resizeMode="cover"
              className="w-28 h-full rounded-xl"
            />
            <View className="absolute z-10 w-full h-full flex items-center justify-center">
              <View>
                <Feather name="play-circle" size={28} color="white" />
              </View>
            </View>
          </View>
        )}
        <View className="flex-1 flex-grow flex items-end justify-center">
          <View className="w-32 h-full flex items-center justify-center rounded-2xl border border-primary-500">
            <TouchableOpacity
              className=" p-3 rounded-2xl flex items-center justify-center"
              onPress={cameraPage}
            >
              <FontAwesome5 name="camera-retro" size={42} color="black" />
              <Text className="text-lg font-gregular text-zinc-900">
                Fotoğraf/Video Çek
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PhotoPage;
