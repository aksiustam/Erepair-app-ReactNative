import { View, Text, StyleSheet, StatusBar } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from "react-native-vision-camera";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  CONTENT_SPACING,
  CONTROL_BUTTON_SIZE,
  MAX_ZOOM_FACTOR,
  SAFE_AREA_PADDING,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./CameraConstant";
import {
  PinchGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useIsForeground } from "./hooks/useIsForeground";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import { CaptureButton } from "./views/CaptureButton";
import { PressableOpacity } from "react-native-pressable-opacity";
import { StatusBarBlurBackground } from "./views/StatusBarBlurBackground";
import GaleryButton from "./GaleryButton";
import Orientation from "react-native-orientation-locker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ReanimatedCamera = Animated.createAnimatedComponent(Camera);
Animated.addWhitelistedNativeProps({
  zoom: true,
});

const SCALE_FULL_ZOOM = 3;

const CameraPage = () => {
  const camera = useRef(null);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const zoom = useSharedValue(1);
  const isPressingButton = useSharedValue(false);
  const navigation = useNavigation();
  // check if camera page is active
  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  let isActive = isFocussed && isForeground;

  const [cameraPosition, setCameraPosition] = useState("back");
  const [enableHdr, setEnableHdr] = useState(false);
  const [flash, setFlash] = useState("off");
  const [enableNightMode, setEnableNightMode] = useState(false);

  // camera device settings
  // const devices = Camera.getAvailableCameraDevices();

  // let device = getCameraDevice(devices, cameraPosition);

  const device = useCameraDevice(cameraPosition);

  const screenAspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  const format = useCameraFormat(device, [
    { videoAspectRatio: screenAspectRatio },
    { videoResolution: "720p" },
    { VideoStabilizationMode: "standard" },
    { photoAspectRatio: screenAspectRatio },
    { photoResolution: "max" },
  ]);

  const supportsFlash = device?.hasFlash ?? false;
  const supportsHdr = format?.supportsPhotoHdr;
  const canToggleNightMode = device?.supportsLowLightBoost ?? false;

  //#region Animated Zoom
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

  const cameraAnimatedProps = useAnimatedProps(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
    return {
      zoom: z,
    };
  }, [maxZoom, minZoom, zoom]);
  //#endregion

  //#region Callbacks
  const setIsPressingButton = useCallback(
    (_isPressingButton) => {
      isPressingButton.value = _isPressingButton;
    },
    [isPressingButton]
  );

  const onError = useCallback((error) => {
    console.error(error);
  }, []);

  const onInitialized = useCallback(() => {
    console.log("Camera initialized!");
    setIsCameraInitialized(true);
  }, []);

  const onMediaCaptured = useCallback(
    (media, type) => {
      console.log(`Media captured! ${JSON.stringify(media)}`);
      navigation.navigate("MediaPage", {
        path: media.path,
        type: type,
      });
    },
    [navigation]
  );

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition((p) => (p === "back" ? "front" : "back"));
  }, []);

  const onFlashPressed = useCallback(() => {
    setFlash((f) => (f === "off" ? "on" : "off"));
  }, []);
  //#endregion
  const [circleColor, setCircleColor] = useState("white");
  const CAPTURE_BUTTON_SIZE = 75; // Example size, adjust as needed
  const circleWidth = CAPTURE_BUTTON_SIZE;
  const radius = CAPTURE_BUTTON_SIZE / 2;
  const innerCircleWidth = CAPTURE_BUTTON_SIZE / 4;
  const innerRadius = innerCircleWidth / 2;

  const opacity = useSharedValue(0);
  const focusX = useSharedValue(0);
  const focusY = useSharedValue(0);
  const timeoutRefs = {
    focusTimeout: useRef(null),
    opacityTimeout: useRef(null),
  };
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    left: focusX.value - radius,
    top: focusY.value - radius,
  }));
  const [isFocusing, setIsFocusing] = useState(false);

  //#region Tap Gesture
  const onFocusTap = useCallback(
    async (event) => {
      if (!device?.supportsFocus) return;
      // Clear previous timeouts if they exist
      if (timeoutRefs.focusTimeout.current) {
        clearTimeout(timeoutRefs.focusTimeout.current);
      }
      if (timeoutRefs.opacityTimeout.current) {
        clearTimeout(timeoutRefs.opacityTimeout.current);
      }

      if (isFocusing) return;

      setIsFocusing(true);
      setCircleColor("white");
      focusX.value = event.nativeEvent.locationX;
      focusY.value = event.nativeEvent.locationY;
      opacity.value = withTiming(1, { duration: 300 });

      try {
        await camera.current?.focus({
          x: event.nativeEvent.locationX,
          y: event.nativeEvent.locationY,
        });
      } catch (error) {
        console.log("Focus operation error:", error);
      } finally {
        setIsFocusing(false);
        timeoutRefs.focusTimeout.current = setTimeout(() => {
          setCircleColor("green");
          timeoutRefs.opacityTimeout.current = setTimeout(() => {
            opacity.value = withTiming(0, { duration: 300 });
          }, 500);
        }, 2000);
      }
    },
    [device?.supportsFocus, isFocusing]
  );

  const onDoubleTap = useCallback(() => {
    onFlipCameraPressed();
  }, [onFlipCameraPressed]);
  //#endregion

  //#region Effects
  useEffect(() => {
    // Reset zoom to its default every time the `device` changes.
    zoom.value = device?.neutralZoom ?? 1;
  }, [zoom, device]);
  //#endregion

  //#region Pinch to Zoom Gesture
  // The gesture handler maps the linear pinch gesture (0 - 1) to an exponential curve since a camera's zoom
  // function does not appear linear to the user. (aka zoom 0.1 -> 0.2 does not look equal in difference as 0.8 -> 0.9)
  const onPinchGesture = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startZoom = zoom.value;
    },
    onActive: (event, context) => {
      // we're trying to map the scale gesture to a linear zoom here
      const startZoom = context.startZoom ?? 0;
      const scale = interpolate(
        event.scale,
        [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
        [-1, 0, 1],
        Extrapolation.CLAMP
      );
      zoom.value = interpolate(
        scale,
        [-1, 0, 1],
        [minZoom, startZoom, maxZoom],
        Extrapolation.CLAMP
      );
    },
  });
  //#endregion
  const insets = useSafeAreaInsets();

  const videoHdr = format?.supportsVideoHdr && enableHdr;
  const photoHdr = format?.supportsPhotoHdr && enableHdr && !videoHdr;

  //#region Orientation
  const [orientation, setOrientation] = useState("PORTRAIT");

  useEffect(() => {
    Orientation.lockToPortrait();

    // Ekran yönelimi değiştiğinde çalışacak fonksiyon
    const handleOrientationChange = (orientation) => {
      setOrientation(orientation);
    };

    Orientation.addDeviceOrientationListener(handleOrientationChange);

    return () => {
      Orientation.removeDeviceOrientationListener(handleOrientationChange);
    };
  }, [setOrientation]);

  const rotation = useSharedValue(0);

  const animatedOriStyle = useAnimatedStyle(() => {
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
  //#endregion

  return (
    <>
      <View style={styles.container}>
        {device != null ? (
          <PinchGestureHandler
            onGestureEvent={onPinchGesture}
            enabled={isActive}
          >
            <Animated.View
              onTouchEnd={onFocusTap}
              style={StyleSheet.absoluteFill}
            >
              <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
                <ReanimatedCamera
                  style={StyleSheet.absoluteFill}
                  device={device}
                  isActive={isActive}
                  ref={camera}
                  onInitialized={onInitialized}
                  onError={onError}
                  format={format}
                  photoHdr={photoHdr}
                  videoHdr={videoHdr}
                  photoQualityBalance="quality"
                  lowLightBoost={
                    device.supportsLowLightBoost && enableNightMode
                  }
                  enableZoomGesture={false}
                  animatedProps={cameraAnimatedProps}
                  exposure={0}
                  outputOrientation="preview"
                  photo={true}
                  video={true}
                  audio={false}
                />
              </TapGestureHandler>
            </Animated.View>
          </PinchGestureHandler>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.text}>Your phone does not have a Camera.</Text>
          </View>
        )}

        <Animated.View style={[styles.focusCircle, animatedStyle]}>
          <View
            style={[
              styles.circle,
              {
                width: circleWidth,
                height: circleWidth,
                borderRadius: radius,
                borderColor: circleColor,
              },
            ]}
          >
            <View
              style={[
                styles.innerCircle,
                {
                  width: innerCircleWidth,
                  height: innerCircleWidth,
                  borderRadius: innerRadius,
                },
              ]}
            />
          </View>
        </Animated.View>
        <CaptureButton
          style={styles.captureButton}
          camera={camera}
          onMediaCaptured={onMediaCaptured}
          cameraZoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          flash={supportsFlash ? flash : "off"}
          enabled={isCameraInitialized && isActive}
          setIsPressingButton={setIsPressingButton}
        />
        <GaleryButton orientation={orientation} />
        <StatusBarBlurBackground />

        <View style={[styles.rightButtonRow, { paddingTop: insets.top }]}>
          <Animated.View style={[animatedOriStyle]}>
            <PressableOpacity
              style={styles.button}
              onPress={onFlipCameraPressed}
              disabledOpacity={0.4}
            >
              <IonIcon name="camera-reverse" color="white" size={24} />
            </PressableOpacity>
          </Animated.View>
          {supportsFlash && (
            <Animated.View style={[animatedOriStyle]}>
              <PressableOpacity
                style={styles.button}
                onPress={onFlashPressed}
                disabledOpacity={0.4}
              >
                <IonIcon
                  name={flash === "on" ? "flash" : "flash-off"}
                  color="white"
                  size={24}
                />
              </PressableOpacity>
            </Animated.View>
          )}

          {supportsHdr && (
            <Animated.View style={[animatedOriStyle]}>
              <PressableOpacity
                style={styles.button}
                onPress={() => setEnableHdr((h) => !h)}
              >
                <MaterialIcon
                  name={enableHdr ? "hdr" : "hdr-off"}
                  color="white"
                  size={24}
                />
              </PressableOpacity>
            </Animated.View>
          )}
          {canToggleNightMode && (
            <Animated.View style={[animatedOriStyle]}>
              <PressableOpacity
                style={styles.button}
                onPress={() => setEnableNightMode(!enableNightMode)}
                disabledOpacity={0.4}
              >
                <IonIcon
                  name={enableNightMode ? "moon" : "moon-outline"}
                  color="white"
                  size={24}
                />
              </PressableOpacity>
            </Animated.View>
          )}
        </View>
      </View>
      <StatusBar translucent backgroundColor="transparent" />
    </>
  );
};

export default CameraPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  captureButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
  focusCircle: {
    position: "absolute",
  },
  circle: {
    borderWidth: 2,
    borderColor: "white", // Change to desired color
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    borderWidth: 2,
    borderColor: "white", // Change to desired color
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: CONTROL_BUTTON_SIZE,
    height: CONTROL_BUTTON_SIZE,
    borderRadius: CONTROL_BUTTON_SIZE / 2,
    backgroundColor: "rgba(140, 140, 140, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  rightButtonRow: {
    position: "absolute",
    right: SAFE_AREA_PADDING.paddingRight + 5,
    top: SAFE_AREA_PADDING.paddingTop + 5,
  },
  text: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
