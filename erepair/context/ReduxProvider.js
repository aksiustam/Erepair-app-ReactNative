import { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext();

export const useReduxContext = () => useContext(GlobalContext);

const ReduxProvider = ({ children }) => {
  const [pctamir, setTamir] = useState({
    id: 0,
    cihaz: "",
    model: "",
    durum: "",
    sorun: [],
    formData: "",
  });
  const [media, setMedia] = useState({
    images: [],
    video: null,
    audio: null,
    editMedia: null,
    zipfile: [],
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [editmedia, setEditMedia] = useState(null);
  const [zipfile, setZipFile] = useState([]);
  const useRedux = async () => {
    try {
      const reduxDataSerialized = await AsyncStorage.getItem("@PCTamir");

      if (reduxDataSerialized !== null) {
        const _reduxData = JSON.parse(reduxDataSerialized);
        setTamir(_reduxData);
      }
    } catch (error) {
      Alert.alert("Error", error);
    }
  };
  useEffect(() => {
    useRedux();
  }, []);

  const setPCTamir = async (data) => {
    try {
      await AsyncStorage.setItem("@PCTamir", JSON.stringify(data));
      setTamir(data);
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        pctamir,
        setPCTamir,

        media,
        setMedia,
        images,
        setImages,
        video,
        setVideo,
        audio,
        setAudio,
        editmedia,
        setEditMedia,
        zipfile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ReduxProvider;
