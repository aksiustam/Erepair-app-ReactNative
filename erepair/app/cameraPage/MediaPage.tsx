import React, { useCallback, useMemo, useState } from 'react'
import type { ImageLoadEventData, NativeSyntheticEvent } from 'react-native'
import { StyleSheet, View, ActivityIndicator, PermissionsAndroid, Platform, Image } from 'react-native'
import type { OnVideoErrorData, OnLoadData } from 'react-native-video'
import Video from 'react-native-video'
import { SAFE_AREA_PADDING } from './CameraConstant'
import { useIsForeground } from './hooks/useIsForeground'
import { PressableOpacity } from 'react-native-pressable-opacity'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { Alert } from 'react-native'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { StatusBarBlurBackground } from './views/StatusBarBlurBackground'
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useReduxContext } from '../../context/ReduxProvider'

const requestSavePermission = async (): Promise<boolean> => {
  // On Android 13 and above, scoped storage is used instead and no permission is needed
  if (Platform.OS !== 'android' || Platform.Version >= 33) return true

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  if (permission == null) return false
  let hasPermission = await PermissionsAndroid.check(permission)
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(permission)
    hasPermission = permissionRequestResult === 'granted'
  }
  return hasPermission
}

type OnLoadImage = NativeSyntheticEvent<ImageLoadEventData>
const isVideoOnLoadEvent = (event: OnLoadData | OnLoadImage): event is OnLoadData => 'duration' in event && 'naturalSize' in event


export function MediaPage({ route }: any): React.ReactElement {
  const { path, type} = route.params
  const [hasMediaLoaded, setHasMediaLoaded] = useState(false)
  const isForeground = useIsForeground()
  const isScreenFocused = useIsFocused()
  const isVideoPaused = !isForeground || !isScreenFocused
  const [savingState, setSavingState] = useState<'none' | 'saving' | 'saved'>('none')


  const navigation = useNavigation();
  const { media, setMedia  } = useReduxContext();

  const onMediaLoad = useCallback((event: OnLoadData | OnLoadImage) => {
    if (isVideoOnLoadEvent(event)) {
      console.log(
        `Video loaded. Size: ${event.naturalSize.width}x${event.naturalSize.height} (${event.naturalSize.orientation}, ${event.duration} seconds)`,
      )
    } else {
      const source = event.nativeEvent.source
      console.log(`Image loaded. Size: ${source.width}x${source.height}`)
    }
  }, [])
  const onMediaLoadEnd = useCallback(() => {
    console.log('media has loaded.')
    setHasMediaLoaded(true)
  }, [])
  const onMediaLoadError = useCallback((error: OnVideoErrorData) => {
    console.error(`failed to load media: ${JSON.stringify(error)}`)
  }, [])

  const onSavePressed = useCallback(async () => {
    try {
      setSavingState('saving')

      const hasPermission = await requestSavePermission()
      if (!hasPermission) {
        Alert.alert('Permission denied!', 'Vision Camera does not have permission to save the media to your camera roll.')
        return
      }
      await CameraRoll.saveAsset(`file://${path}`, {
        type: type,
      })

      if(media?.editMedia != null){
        if (media?.editMedia.type === "image") {

          const updatedImages = media?.images?.map((item:any) => {
            if (item.uri === media?.editMedia?.uri) {
              return { uri: source.uri, type: media?.editMedia?.type };
            }
            return item;
          });
          setMedia((prevMedia : any) => ({
            ...prevMedia,
            images: updatedImages,
          }));
         
        }
        if (media?.editMedia?.type === "video") {
          setMedia((prevMedia : any) => ({
            ...prevMedia,
            video: { uri: source.uri, type },
          }));
         
        }
        setMedia((prevMedia : any) => ({
          ...prevMedia,
          editMedia: null,
        }));

      }else{
        if (type === "image") {
          if (media?.images?.length < 4) {
            setMedia((prevMedia : any) => ({
              ...prevMedia,
              images: [...media?.images, { uri: source.uri, type }],
            }));
            
          } else {
            Alert.alert(
              "Maximum Resme Ulaşıldı",
              "Sadece 4 adet Resim Seçebilirsiniz."
            );
          }
        }
        if (type === "video") {
          setMedia((prevMedia : any) => ({
            ...prevMedia,
            video: { uri: source.uri, type },
          }));
          
        }
      }
      
      setSavingState('saved')
      navigation.goBack()
      
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e)
      setSavingState('none')
      Alert.alert('Failed to save!', `An unexpected error occured while trying to save your ${type}. ${message}`)
    }
  }, [path, type])

  const source = useMemo(() => ({ uri: `file://${path}` }), [path])

  const screenStyle = useMemo(() => ({ opacity: hasMediaLoaded ? 1 : 0 }), [hasMediaLoaded])

  return (
    <View style={[styles.container, screenStyle]}>
      {type === 'image' && (
        <Image source={source} style={StyleSheet.absoluteFill} resizeMode="cover" onLoadEnd={onMediaLoadEnd} onLoad={onMediaLoad} />
      )}
      {type === 'video' && (
        <Video
          source={source}
          style={StyleSheet.absoluteFill}
          paused={isVideoPaused}
          resizeMode="stretch"
          allowsExternalPlayback={false}
          automaticallyWaitsToMinimizeStalling={false}
          disableFocus={true}
          repeat={true}
          controls={false}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          onReadyForDisplay={onMediaLoadEnd}
          onLoad={onMediaLoad}
          onError={onMediaLoadError}
        />
      )}

      <PressableOpacity style={styles.closeButton} onPress={navigation.goBack}>
        <IonIcon name="close" size={35} color="white" style={styles.icon} />
      </PressableOpacity>

      <PressableOpacity style={styles.saveButton} onPress={onSavePressed} disabled={savingState !== 'none'}>
        {savingState === 'none' && <IonIcon name="checkmark" size={35} color="white" style={styles.icon} />}
        {savingState === 'saved' && <IonIcon name="checkmark" size={35} color="white" style={styles.icon} />}
        {savingState === 'saving' && <ActivityIndicator color="white" />}
      </PressableOpacity>

      <StatusBarBlurBackground />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom + 30,
    left: SAFE_AREA_PADDING.paddingLeft + 30,
    width: 40,
    height: 40,
  },
  saveButton: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom + 30,
    right: SAFE_AREA_PADDING.paddingRight + 30,
    width: 40,
    height: 40,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },
})
