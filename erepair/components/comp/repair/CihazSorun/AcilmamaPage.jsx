import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useReduxContext } from "../../../../context/ReduxProvider";
import RNFS from "react-native-fs";
import { zip } from "react-native-zip-archive";
import { Controller, useForm } from "react-hook-form";
import PhotoPage from "../../../photoBox";
import AudioPage from "../../../audioBox";
import CheckBox from "react-native-check-box";

const AcilmamaPage = ({ pctamir, setPageContent, sorundata }) => {
  const { media, setMedia, setPCTamir } = useReduxContext();
  const checkmedia = pctamir?.sorun?.some((item) => item.check === true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [bmodalVisible, setBModalVisible] = useState(false);
  const [tmodalVisible, setTModalVisible] = useState(false);
  const [mmodalVisible, setMModalVisible] = useState(false);
  const [omodalVisible, setOModalVisible] = useState(false);
  const [dmodalVisible, setDModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [bilgicheck, setBilgiCheck] = useState(false);

  const onSubmit = async (data) => {
    if (checkmedia) {
      setLoading(true);
      let bucket1 = pctamir;
      bucket1.sorun = bucket1.sorun.map((item) =>
        item.name === sorundata.name
          ? { ...item, check: true, formData: data }
          : item
      );

      await setPCTamir(bucket1);

      await Alert.alert(
        "Başarılı!",
        "Cihazınızın Açılmama Sorunu Başarıyla Kaydedildi."
      );
      if (bucket1.sorun.some((item) => item.check === false)) {
        await Alert.alert(
          "Devam Ediniz!",
          "Seçtiğiniz Bir Sonraki Soruna geçiliyor."
        );
      }
      setLoading(false);
      setPageContent(0);
    } else {
      if (media?.images.length !== 4) {
        Alert.alert("Hata!", "4 Tane Resim Seçin / Yükleyin");
        return;
      }
      if (media?.video == null) {
        Alert.alert("Hata!", "1 Video Seçin / Yükleyin");
        return;
      }

      setLoading(true);
      const files = [
        ...(media?.audio != null
          ? [
              {
                type: "audio",
                oldUri: media?.audio,
                newUri: `${RNFS.DocumentDirectoryPath}/sesdosyasi.aac`,
              },
            ]
          : []),
        {
          type: "video",
          oldUri: media?.video.uri,
          newUri: `${RNFS.DocumentDirectoryPath}/video.mov`,
        },
        ...media?.images?.map((item, index) => ({
          type: item.type,
          oldUri: item.uri,
          newUri: `${RNFS.DocumentDirectoryPath}/resim${index}.jpg`,
        })),
      ];

      for (const file of files) {
        await RNFS.moveFile(file.oldUri, file.newUri);
      }
      const zipPath = `${RNFS.DocumentDirectoryPath}/media.zip`;
      const fileUris = files.map((file) => file.newUri);
      await zip(fileUris, zipPath);

      setMedia((prevMedia) => ({
        ...prevMedia,
        zipFile: zipPath,
      }));

      let bucket1 = pctamir;
      bucket1.sorun = bucket1.sorun.map((item) =>
        item.name === sorundata.name
          ? { ...item, check: true, formData: data }
          : item
      );

      await setPCTamir(bucket1);

      await Alert.alert(
        "Başarılı!",
        "Cihazınızın Açılmama Sorunu Başarıyla Kaydedildi."
      );
      if (bucket1.sorun.some((item) => item.check === false)) {
        await Alert.alert(
          "Devam Ediniz!",
          "Seçtiğiniz Bir Sonraki Soruna geçiliyor."
        );
      }
      setLoading(false);
      setPageContent(0);
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={bmodalVisible}
        onRequestClose={() => {
          setBModalVisible(!bmodalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setBModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView} className="px-3 py-3 ">
              <Text className="text-xl font-gregular block ">
                1- Bilgisayarınız Açılmıyorsa Cihazınızın Markası ve Model No'su
                gözükecek şekilde Fotoğraf çekmeniz veya Yazmanız yeterli
              </Text>
              <Text className="text-xl font-gregular block ">
                2- Bilgisayarınızın Aldığı Hata varsa Hata Fotografını veya
                Videosunu Yükleyin veya Yazınız.
              </Text>
              <Text className="text-xl font-gregular block ">
                3- Bilgisayarınızın Ek Durumu ve varsa Hasarını belirtiniz.
              </Text>

              <Text className="text-xl font-gregular block">
                4- Windows Kurulu Bilgisayarınız Açılıyorsa Bilgilerini Öğrenmek
                için ;
              </Text>
              <Text className="text-xl font-gregular block pl-3">
                4-1- Bilgisayarım {">"} Sağ Tıkla {">"} Özellikler {">"} den
                İşlemci ve Ram Miktarını Öğreniniz.
              </Text>
              <Text className="text-xl font-gregular block pl-3">
                4-2- Başlat Menüsü {">"} Sağ Tıkla {">"} Aygıt Yöneticisi {">"}
                Görüntü Bağdaştırıcılarını Açarak
              </Text>
              <Text className="text-xl font-gregular block pl-3">
                4-3- Çıkan bilgilerden bir veya ikisini birden Ekran Kartı
                Kısmına Giriniz.
              </Text>
              <Text className="text-xl font-gregular block pt-2">
                5- Apple Kurulu Bilgisayarınız Açılıyorsa Bilgilerini Öğrenmek
                için ;
              </Text>
              <Text className="text-xl font-gregular block pl-3">
                5-1- Yukarıdaki Menüden Sol Üstteki Apple Logosuna Tıklayın.
              </Text>
              <Text className="text-xl font-gregular block pl-3">
                5-2- Bu Mac Hakkında seçeneğine tıklayın
              </Text>
              <Text className="text-xl font-gregular block pl-3">
                5-3 Çıkan bilgilerden Cihazın model adı ve yılını girmeniz
                yeterlidir.
              </Text>
              <View className="mt-3 w-fit flex items-center justify-center">
                <Pressable
                  onPress={() => setBModalVisible(!bmodalVisible)}
                  className="bg-zinc-900 rounded-xl px-4 py-2"
                >
                  <Text className="text-2xl font-gbold text-slate-100">
                    Tamam
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={tmodalVisible}
        onRequestClose={() => {
          setTModalVisible(!tmodalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setTModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView} className="px-3 py-3 ">
              <Text className="text-xl font-gregular block ">
                1- Telefon/Tablet cihazınızın Markası ve Model No'sunu yazmanız
                yeterlidir.
              </Text>
              <Text className="text-xl font-gregular block ">
                2- Telefon/Tablet cihazınızın aldığı Hata varsa Hata Fotografını
                veya Videosunu Yükleyin veya Yazınız.
              </Text>

              <Text className="text-xl font-gregular block">
                3- Eğer biliyorsanız Android/Iphone cihazınızın Android/IOS
                sürümü
              </Text>
              <Text className="text-xl font-gregular block ">
                4- Cihazınızın ek durumu ve varsa Hasarını yazınız
              </Text>

              <View className="mt-3 w-fit flex items-center justify-center">
                <Pressable
                  onPress={() => setTModalVisible(!tmodalVisible)}
                  className="bg-zinc-900 rounded-xl px-4 py-2"
                >
                  <Text className="text-2xl font-gbold text-slate-100">
                    Tamam
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={mmodalVisible}
        onRequestClose={() => {
          setMModalVisible(!mmodalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setMModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView} className="px-3 py-3 ">
              <Text className="text-xl font-gregular block ">
                1- Cihazınızın Ön kısmındaki Markası ve Modeli ve varsa arka
                kısmında yazan Model No'sunu Fotograf ile / Yazarak Belirtiniz.
              </Text>
              <Text className="text-xl font-gregular block ">
                2- Cihazınızın Aldığı Hata varsa Hata Fotografını veya Videosunu
                Yükleyin veya Yazınız.
              </Text>
              <Text className="text-xl font-gregular block ">
                3- Cihazınızın ek durumu ve varsa hasarını yazınız
              </Text>

              <View className="mt-3 w-fit flex items-center justify-center">
                <Pressable
                  onPress={() => setMModalVisible(!mmodalVisible)}
                  className="bg-zinc-900 rounded-xl px-4 py-2"
                >
                  <Text className="text-2xl font-gbold text-slate-100">
                    Tamam
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={omodalVisible}
        onRequestClose={() => {
          setOModalVisible(!omodalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setOModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView} className="px-3 py-3 ">
              <Text className="text-xl font-gregular block ">
                1- Oyun Konsolunun Modeli ve Cinsini Yazmanız Yeterlidir.
              </Text>

              <Text className="text-xl font-gregular block ">
                2- Oyun Konsolunu nerden aldığınızı ve varsa ek özelliklerini
                belirtiniz.
              </Text>
              <Text className="text-xl font-gregular block ">
                3- Oyun Konsolunun Aldığı Hata varsa Hata Fotografını veya
                Videosunu Yükleyin veya Yazınız.
              </Text>
              <View className="mt-3 w-fit flex items-center justify-center">
                <Pressable
                  onPress={() => setOModalVisible(!omodalVisible)}
                  className="bg-zinc-900 rounded-xl px-4 py-2"
                >
                  <Text className="text-2xl font-gbold text-slate-100">
                    Tamam
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={dmodalVisible}
        onRequestClose={() => {
          setOModalVisible(!dmodalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setDModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView} className="px-3 py-3 ">
              <Text className="text-xl font-gregular block ">
                1- Cihazınızın Adı, Marka ve Model No'sunu Yazınız
              </Text>
              <Text className="text-xl font-gregular block ">
                2- Cihazınızın Ek Özelliklerini ( Depolama Kapasitesi, Miktarı ,
                Özelleştirilmiş kısımları ) Yazınız
              </Text>
              <Text className="text-xl font-gregular block ">
                3- Cihazınızın Aldığı Hata varsa Hata Fotografını veya Videosunu
                Yükleyin veya Yazınız.
              </Text>
              <View className="mt-3 w-fit flex items-center justify-center">
                <Pressable
                  onPress={() => setDModalVisible(!dmodalVisible)}
                  className="bg-zinc-900 rounded-xl px-4 py-2"
                >
                  <Text className="text-2xl font-gbold text-slate-100">
                    Tamam
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <View className="h-full mx-2 ">
        <View className="px-6 py-1 rounded-full bg-white my-3">
          <Text className="text-2xl font-gmedium text-center">
            Açılmayan Cihazın Bilgilerini Girelim!
          </Text>
        </View>
        <View className="w-full h-auto my-4">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="flat"
                label={
                  <>
                    <Text className="font-gregular text-lg">
                      Cihazın Size Göre Sorununu Yazınız{" "}
                    </Text>
                    <Text className="font-gregular text-lg text-red-600">
                      {errors.sorun && "- Zorunlu!"}
                    </Text>
                  </>
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline={true}
              />
            )}
            name="sorun"
          />
        </View>
        {(pctamir?.cihaz === "bilgisayar" || pctamir?.cihaz === "laptop") && (
          <>
            <View className="w-full">
              <Text className="text-lg font-gregular ml-1">
                Bilgisayarınızın Özelliklerini Yazınız / Yükleyin
              </Text>
              <View className="w-full flex items-start justify-start">
                <Button
                  mode="elevated"
                  onPress={() => setBModalVisible(true)}
                  className="w-36 mt-2  flex items-center justify-center bg-zinc-900"
                >
                  <Text className="text-slate-200 font-gmedium text-lg">
                    Yardım Al ?
                  </Text>
                </Button>
              </View>
            </View>
            <View className="w-full">
              <View className="w-full flex flex-row items-center justify-start">
                <TouchableOpacity
                  className="my-1 ml-1"
                  onPress={() => setBilgiCheck(!bilgicheck)}
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Bilgilerimin Fotoğrafını Çektim
                  </Text>
                </TouchableOpacity>
                <CheckBox
                  isChecked={bilgicheck}
                  onClick={() => setBilgiCheck(!bilgicheck)}
                />
              </View>
              <Controller
                control={control}
                rules={{
                  required: !bilgicheck,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={
                      <>
                        <Text className="font-gregular text-lg">
                          Bilgisayar Bilgileri{" "}
                        </Text>
                        <Text className="font-gregular text-lg text-red-600">
                          {errors.cihazbilgi && "- Zorunlu!"}
                        </Text>
                      </>
                    }
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    multiline={true}
                    disabled={bilgicheck}
                  />
                )}
                name="cihazbilgi"
              />
            </View>
          </>
        )}
        {(pctamir?.cihaz === "telefon" || pctamir?.cihaz === "tablet") && (
          <>
            <View className="w-full">
              <Text className="text-lg font-gregular ml-1">
                Telefon/Tabletin Özelliklerini Yazınız
              </Text>
              <View className="w-full flex items-start justify-start">
                <Button
                  mode="elevated"
                  onPress={() => setTModalVisible(true)}
                  className="w-36 mt-2  flex items-center justify-center bg-zinc-900"
                >
                  <Text className="text-slate-200 font-gmedium text-lg">
                    Yardım Al ?
                  </Text>
                </Button>
              </View>
            </View>
            <View className="w-full">
              <TouchableOpacity
                className="flex my-1 ml-1 w-full flex-row items-center justify-start"
                onPress={() => setBilgiCheck(!bilgicheck)}
                activeOpacity={0.5}
              >
                <Text className="font-gregular text-lg">
                  Bilgilerimin Fotoğrafını Çektim
                </Text>
                <CheckBox
                  isChecked={bilgicheck}
                  onClick={() => setBilgiCheck(!bilgicheck)}
                />
              </TouchableOpacity>
              <Controller
                control={control}
                rules={{
                  required: !bilgicheck,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={
                      <>
                        <Text className="font-gregular text-lg">
                          Telefon / Tablet Bilgileri{" "}
                        </Text>
                        <Text className="font-gregular text-lg text-red-600">
                          {errors.cihazbilgi && "- Zorunlu!"}
                        </Text>
                      </>
                    }
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    multiline={true}
                    disabled={bilgicheck}
                  />
                )}
                name="cihazbilgi"
              />
            </View>
          </>
        )}
        {(pctamir?.cihaz === "monitor" || pctamir?.cihaz === "yazici") && (
          <>
            <View className="w-full">
              <Text className="text-lg font-gregular ml-1">
                {pctamir?.cihaz === "monitor" ? "Monitör" : "Yazıcı"}{" "}
                Özelliklerini Yazınız
              </Text>
              <View className="w-full flex items-start justify-start">
                <Button
                  mode="elevated"
                  onPress={() => setMModalVisible(true)}
                  className="w-36 mt-2  flex items-center justify-center bg-zinc-900"
                >
                  <Text className="text-slate-200 font-gmedium text-lg">
                    Yardım Al ?
                  </Text>
                </Button>
              </View>
            </View>
            <View className="w-full">
              <TouchableOpacity
                className="flex my-1 ml-1 w-full flex-row items-center justify-start"
                onPress={() => setBilgiCheck(!bilgicheck)}
                activeOpacity={0.5}
              >
                <Text className="font-gregular text-lg">
                  Bilgilerimin Fotoğrafını Çektim
                </Text>
                <CheckBox
                  isChecked={bilgicheck}
                  onClick={() => setBilgiCheck(!bilgicheck)}
                />
              </TouchableOpacity>
              <Controller
                control={control}
                rules={{
                  required: !bilgicheck,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={
                      <>
                        <Text className="font-gregular text-lg">
                          {pctamir?.cihaz === "monitor"
                            ? "Monitör Bilgileri"
                            : "Yazıcı Bilgileri"}{" "}
                        </Text>
                        <Text className="font-gregular text-lg text-red-600">
                          {errors.cihazbilgi && "- Zorunlu!"}
                        </Text>
                      </>
                    }
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    multiline={true}
                    disabled={bilgicheck}
                  />
                )}
                name="cihazbilgi"
              />
            </View>
          </>
        )}
        {pctamir?.cihaz === "oyunkonsol" && (
          <>
            <View className="w-full">
              <Text className="text-lg font-gregular ml-1">
                Oyun Konsolunuzun Özelliklerini Yazınız
              </Text>
              <View className="w-full flex items-start justify-start">
                <Button
                  mode="elevated"
                  onPress={() => setOModalVisible(true)}
                  className="w-36 mt-2  flex items-center justify-center bg-zinc-900"
                >
                  <Text className="text-slate-200 font-gmedium text-lg">
                    Yardım Al ?
                  </Text>
                </Button>
              </View>
            </View>
            <View className="w-full">
              <TouchableOpacity
                className="flex my-1 ml-1 w-full flex-row items-center justify-start"
                onPress={() => setBilgiCheck(!bilgicheck)}
                activeOpacity={0.5}
              >
                <Text className="font-gregular text-lg">
                  Bilgilerimin Fotoğrafını Çektim
                </Text>
                <CheckBox
                  isChecked={bilgicheck}
                  onClick={() => setBilgiCheck(!bilgicheck)}
                />
              </TouchableOpacity>
              <Controller
                control={control}
                rules={{
                  required: !bilgicheck,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={
                      <>
                        <Text className="font-gregular text-lg">
                          Oyun Konsolunun Bilgileri{" "}
                        </Text>
                        <Text className="font-gregular text-lg text-red-600">
                          {errors.cihazbilgi && "- Zorunlu!"}
                        </Text>
                      </>
                    }
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    multiline={true}
                    disabled={bilgicheck}
                  />
                )}
                name="cihazbilgi"
              />
            </View>
          </>
        )}
        {pctamir?.cihaz === "diger" && (
          <>
            <View className="w-full">
              <Text className="text-lg font-gregular ml-1">
                Cihazınızın Özelliklerini Yazınız / Yükleyin
              </Text>
              <View className="w-full flex items-start justify-start">
                <Button
                  mode="elevated"
                  onPress={() => setDModalVisible(true)}
                  className="w-36 mt-2  flex items-center justify-center bg-zinc-900"
                >
                  <Text className="text-slate-200 font-gmedium text-lg">
                    Yardım Al ?
                  </Text>
                </Button>
              </View>
            </View>
            <View className="w-full">
              <TouchableOpacity
                className="flex my-1 ml-1 w-full flex-row items-center justify-start"
                onPress={() => setBilgiCheck(!bilgicheck)}
                activeOpacity={0.5}
              >
                <Text className="font-gregular text-lg">
                  Bilgilerimin Fotoğrafını Çektim
                </Text>
                <CheckBox
                  isChecked={bilgicheck}
                  onClick={() => setBilgiCheck(!bilgicheck)}
                />
              </TouchableOpacity>
              <Controller
                control={control}
                rules={{
                  required: !bilgicheck,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={
                      <>
                        <Text className="font-gregular text-lg">
                          Cihaz Bilgileri{" "}
                        </Text>
                        <Text className="font-gregular text-lg text-red-600">
                          {errors.cihazbilgi && "- Zorunlu!"}
                        </Text>
                      </>
                    }
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    multiline={true}
                    disabled={bilgicheck}
                  />
                )}
                name="cihazbilgi"
              />
            </View>
          </>
        )}
        {checkmedia === false && (
          <>
            <View className="w-full mb-2">
              <Text className="text-lg font-gregular ml-1">
                En Fazla 4 Resim ve 1 Video Seçin / Yükleyin
              </Text>
            </View>
            <PhotoPage />
            <View className="w-full mb-2">
              <Text className="text-lg font-gregular ml-1">
                İsteğe Bağlı Ses kaydı ile sorununuzu anlatın...
              </Text>
            </View>
            <AudioPage />
          </>
        )}

        <View className="w-full my-2">
          <View className="mb-1 py-1">
            <Text className="font-gregular  ml-1">
              Cihazın Şu anki Durumu ( Sağlam / Hasarlı / Kusurlu ise kusurunu
              belirtin )
            </Text>
          </View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="flat"
                label={
                  <>
                    <Text className="font-gregular text-lg">
                      Cihazın Şu anki Durumu{" "}
                    </Text>
                    <Text className="font-gregular text-lg text-red-600">
                      {errors.durum && "- Zorunlu!"}
                    </Text>
                  </>
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.checkbox}
                multiline={true}
                className="font-gmedium"
              />
            )}
            name="durum"
          />
        </View>
        <View className="w-full my-2">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="flat"
                label={
                  <>
                    <Text className="font-gregular text-lg">
                      Cihaz Tamirinde Yapılacaklar ve Yapılmayacaklar{" "}
                    </Text>
                    <Text className="font-gregular text-lg text-red-600">
                      {errors.yapılacaklar && "- Zorunlu!"}
                    </Text>
                  </>
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline={true}
              />
            )}
            name="yapılacaklar"
          />
        </View>
        <View className="w-full my-2">
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="flat"
                label={
                  <>
                    <Text className="font-gregular text-lg">
                      Göndereceğiniz Ek Malzemeler{" "}
                    </Text>
                    <Text className="font-gregular text-lg text-red-600">
                      {errors.ekmalzeme && "- Zorunlu!"}
                    </Text>
                  </>
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline={true}
              />
            )}
            name="ekmalzeme"
          />
        </View>
        <View className="w-full my-2">
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="flat"
                label={
                  <>
                    <Text className="font-gregular text-lg">
                      Aciliyet Durumu{" "}
                    </Text>
                    <Text className="font-gregular text-lg text-red-600">
                      {errors.acil && "- Zorunlu!"}
                    </Text>
                  </>
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline={true}
              />
            )}
            name="acil"
          />
        </View>
        <View className="w-full my-2">
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="flat"
                label={
                  <>
                    <Text className="font-gregular text-lg">
                      Alıcıya gidecek Not{" "}
                    </Text>
                    <Text className="font-gregular text-lg text-red-600">
                      {errors.not && "- Zorunlu!"}
                    </Text>
                  </>
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline={true}
              />
            )}
            name="not"
          />
        </View>

        <View className="mt-6">
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          >
            Devam Et
          </Button>
        </View>
      </View>
    </>
  );
};

export default AcilmamaPage;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  checkbox: {
    fontFamily: "Giorgio-Sans-Regular",
    fontSize: 16,
    textAlign: "left",
  },
});
