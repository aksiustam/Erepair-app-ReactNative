import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from "react-native-audio-recorder-player";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useReduxContext } from "../../context/ReduxProvider";

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1);

const AudioPage = () => {
  const { media, setMedia } = useReduxContext();

  const [recording, setRecording] = useState({
    isLoggingIn: false,
    recordSecs: 0,
    recordTime: "00:00:00",
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: "00:00:00",
    duration: "00:00:00",
  });

  const onStartRecord = async () => {
    if (Platform.OS === "android") {
      try {
        if (Platform.Version >= 30) {
          // Android 11+

          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          if (
            grants["android.permission.RECORD_AUDIO"] ===
            PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log("permissions granted");
          } else {
            ToastAndroid.show("İzinler Sağlanamadı", ToastAndroid.LONG);
            return;
          }
        } else {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
          if (
            grants["android.permission.WRITE_EXTERNAL_STORAGE"] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants["android.permission.READ_EXTERNAL_STORAGE"] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants["android.permission.RECORD_AUDIO"] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log("permissions granted");
          } else {
            ToastAndroid.show("İzinler Sağlanamadı", ToastAndroid.LONG);
            return;
          }
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    setMedia((prevMedia) => ({
      ...prevMedia,
      audio: null,
    }));

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };
    await audioRecorderPlayer.startRecorder(undefined, audioSet);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecording((prev) => ({
        ...prev,
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: "00:00:00",
        duration: "00:00:00",
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      }));
    });
  };
  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setMedia((prevMedia) => ({
      ...prevMedia,
      audio: result,
    }));
  };
  const onResumeRecord = async () => {
    await audioRecorderPlayer.resumeRecorder();
  };
  const onPauseRecord = async () => {
    try {
      await audioRecorderPlayer.pauseRecorder();
    } catch (err) {
      console.log("pauseRecord", err);
    }
  };

  const onStartPlay = async () => {
    try {
      await audioRecorderPlayer.startPlayer(media?.audio);

      await audioRecorderPlayer.setVolume(1.0);

      audioRecorderPlayer.addPlayBackListener((e) => {
        setRecording((prev) => ({
          ...prev,
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        }));
      });
    } catch (err) {
      console.log("startPlayer error", err);
    }
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setRecording((prev) => ({
      ...prev,
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: "00:00:00",
      duration: "00:00:00",
    }));
  };
  const screenWidth = Dimensions.get("screen").width;

  let playWidth =
    (recording.currentPositionSec / recording.currentDurationSec) *
    (screenWidth - 27);

  if (!playWidth) {
    playWidth = 0;
  }

  return (
    <View className="w-full h-32 border border-primary-500 rounded-xl flex items-start justify-start">
      <View className="w-full h-full p-3 flex flex-col items-center justify-center">
        <View className="flex w-full space-x-7 flex-row items-center justify-center">
          <TouchableOpacity
            className="flex items-center justify-center"
            onPress={onStartRecord}
          >
            <FontAwesome5 name="microphone" size={24} color="black" />
            <Text className="font-gregular text-xl">Başlat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center"
            onPress={media?.audio != null ? onPausePlay : onPauseRecord}
          >
            <FontAwesome6 name="pause" size={24} color="black" />
            <Text className="font-gregular text-xl">Durdur</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex items-center justify-center"
            onPress={media?.audio != null ? onStartPlay : onResumeRecord}
          >
            <FontAwesome6 name="play" size={24} color="black" />
            {media?.audio != null ? (
              <Text className="font-gregular text-xl">Oynat</Text>
            ) : (
              <Text className="font-gregular text-xl">Devam Et</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="flex items-center justify-center"
            onPress={media?.audio != null ? onStopPlay : onStopRecord}
          >
            <FontAwesome6 name="stop" size={24} color="black" />
            <Text className="font-gregular text-xl">Gönder</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full flex flex-row items-start justify-start pl-2">
          {media?.audio != null ? (
            <Text className="font-gbold text-lg">{recording.playTime} - </Text>
          ) : (
            ""
          )}
          <Text className="font-gbold text-lg">{recording.recordTime}</Text>
        </View>
        <TouchableOpacity className="self-stretch mt-1">
          <View className="h-1 self-stretch bg-slate-500  rounded-xl">
            <View className="h-1 bg-blue-600" style={{ width: playWidth }} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioPage;
