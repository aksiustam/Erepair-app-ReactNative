import { View, Alert, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { launchImageLibrary } from "react-native-image-picker";
import { useReduxContext } from "../../context/ReduxProvider";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const GaleryButton = ({ orientation }) => {
  const { media, setMedia } = useReduxContext();

  const navigation = useNavigation();
  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: "mixed",
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else {
          const source = response.assets[0].uri;
          let type = response.assets[0].type.split("/")[0];

          if (media?.editMedia != null) {
            if (media?.editMedia?.type === "image") {
              const updatedImages = media?.images?.map((item) => {
                if (item.uri === media?.editMedia?.uri) {
                  return { uri: source, type: media?.editMedia?.type };
                }
                return item;
              });

              setMedia((prevMedia) => ({
                ...prevMedia,
                images: updatedImages,
              }));
            }
            if (media?.editMedia?.type === "video") {
              setMedia((prevMedia) => ({
                ...prevMedia,
                video: { uri: source, type },
              }));
            }
            setMedia((prevMedia) => ({
              ...prevMedia,
              editMedia: null,
            }));
          } else {
            if (type === "image") {
              if (media?.images?.length < 4) {
                setMedia((prevMedia) => ({
                  ...prevMedia,
                  images: [...media?.images, { uri: source, type }],
                }));
              } else {
                Alert.alert(
                  "Maximum Resme Ulaşıldı",
                  "Sadece 4 adet Resim Seçebilirsiniz."
                );
              }
            }
            if (type === "video") {
              setMedia((prevMedia) => ({
                ...prevMedia,
                video: { uri: source, type },
              }));
            }
          }

          navigation.goBack();
        }
      }
    );
  };
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    let angle = 0;

    switch (orientation) {
      case "LANDSCAPE-LEFT":
        angle = 90;
        break;
      case "PORTRAIT-UPSIDEDOWN":
        angle = 180;
        break;
      case "LANDSCAPE-RIGHT":
        angle = 270;
        break;
      case "PORTRAIT":
      default:
        angle = 0;
        break;
    }

    rotation.value = withTiming(angle, { duration: 300 });

    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  }, [orientation]);

  return (
    <View className="absolute bottom-8 left-12 flex items-center justify-center">
      <TouchableOpacity onPress={selectImage}>
        <Animated.View style={animatedStyle}>
          <FontAwesome name="image" color="white" size={42} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default GaleryButton;
