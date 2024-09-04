import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { useReduxContext } from "../../context/ReduxProvider";
import RNFS from "react-native-fs";
import { useGlobalContext } from "../../context/GlobalProvider";
import { zip } from "react-native-zip-archive";
import beautify from "json-beautify";
import RadioBox from "../../components/radioBox";
import CheckBox from "react-native-check-box";

const Repair8 = () => {
  const { user } = useGlobalContext();

  const { pctamir, media } = useReduxContext();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const nextPage = async () => {
    Alert.alert(
      "Soru ?",
      "Bu işlemleri Onaylıyor Musunuz ?",
      [
        {
          text: "Hayır",
          style: "cancel",
        },
        {
          text: "Evet",
          onPress: async () => {
            setLoading(true);
            // await new Promise((resolve) => setTimeout(resolve, 3000));

            const path = `${RNFS.DocumentDirectoryPath}/sorular.txt`;

            // const destPath = `${RNFS.DownloadDirectoryPath}/example.txt`;

            const textData = {
              cihaz: pctamir.cihaz,
              model: pctamir.model,
              garantidurumu: pctamir.durum,
              sorunlar: pctamir?.sorun?.map((item) => ({
                arizasorunu: item.name,
                sorun: item.formData.sorun,
                cihaz_bilgisi: item.formData.cihazbilgi,
                cihaz_durumu: item.formData.durum,
                cihaz_yapılacaklar: item.formData.yapılacaklar,
                cihaz_ekmalzeme: item.formData.ekmalzeme,
                cihaz_acil: item.formData.acil,
                cihaz_not: item.formData.not,
              })),
              cihazda_bilgi_varmı: answers.bilgicheck ? "Evet" : "Hayır",
              yedekler_alınsınmı: answers.yedek ? "Evet" : "Hayır",
              windows_kurulsun: answers.windowscheck ? "Evet" : "Hayır",
              windows_tip: answers.windowscheck ? answers.windows : "Hayır",
              orjinal_windows: answers.orjinal ? "Evet" : "Hayır",
              anti_virus: answers.guvenlik ? "Evet" : "Hayır",
              genel_bakim: answers.temizlik ? "Evet" : "Hayır",
              icini_acma: answers.iconay ? "Evet" : "Hayır",
              parcalar_degissin: answers.cihazparca ? "Evet" : "Hayır",
              parcalar_gonder: answers.malzemeart ? "Evet" : "Hayır",
              ram_ekle: answers.rammiktar !== "0" ? "Hayır" : answers.rammiktar,
              hdd_ekle: answers.ssdmiktar !== "0" ? "Hayır" : answers.ssdmiktar,
              beni_bilgilendir: answers.notify ? "Evet" : "Hayır",
              fiyat_limit: answers.limit,
            };

            const prettyJson = beautify(textData, null, 2, 80);

            await RNFS.writeFile(path, prettyJson, "utf8");

            let fileUris = [];

            fileUris.push(path);
            fileUris.push(media?.zipFile);
            let username = user?.name?.replace(/\s+/g, "").toLowerCase();

            const zipPath = `${RNFS.DownloadDirectoryPath}/${username}.zip`;

            await zip(fileUris, zipPath);
            setLoading(false);
            navigation.navigate("Repair9");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const [answers, setAnswers] = useState({
    bilgicheck: false,
    yedek: false,
    windowscheck: false,
    windows: "Win11",
    orjinal: false,
    guvenlik: false,
    temizlik: false,
    iconay: false,
    cihazparca: false,
    malzemeart: false,
    rammiktar: "0",
    ssdmiktar: "0",
    notify: false,
    limit: "0",
  });

  if (loading) {
    return (
      <View className="bg-white flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView className="bg-white w-full h-full">
        <ScrollView>
          <View className="w-full h-full flex-col items-center justify-center px-3">
            <View className="w-full py-1 rounded-full bg-white my-3">
              <Text className="text-4xl font-gbold text-center">Son Aşama</Text>
            </View>

            {(pctamir.cihaz === "bilgisayar" || pctamir.cihaz === "laptop") && (
              <>
                <TouchableOpacity
                  className="w-full h-auto flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      bilgicheck: !prev.bilgicheck,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Bilgisayar / Laptopda Bilgiler Varmı ?
                  </Text>
                  <CheckBox
                    isChecked={answers.bilgicheck}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        bilgicheck: !prev.bilgicheck,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>
                <View className="w-full h-[1px] bg-black shadow-lg shadow-black" />
                {answers.bilgicheck && (
                  <TouchableOpacity
                    className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                    onPress={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        yedek: !prev.yedek,
                      }))
                    }
                    activeOpacity={0.5}
                  >
                    <Text className="w-[70%] font-gregular text-lg">
                      Önemli Bilgilerinizi İşlemden Önce Gerekirse
                      yedekleyeceğiz Onaylıyor musunuz ?
                    </Text>
                    <CheckBox
                      isChecked={answers.yedek}
                      onClick={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          yedek: !prev.yedek,
                        }));
                      }}
                      style={{ marginRight: 12 }}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      windowscheck: !prev.windowscheck,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    İşlem sonrası Bilgisayara format atılsın mı? ( 200 TL )
                  </Text>

                  <CheckBox
                    isChecked={answers.windowscheck}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        windowscheck: !prev.windowscheck,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>

                {answers.windowscheck && (
                  <View className="w-full h-auto border-b-[0.5px]">
                    <Text className="font-gregular text-xl ">
                      Hangi Windows u tercih edersiniz ?
                    </Text>
                    <RadioBox
                      items={[
                        { name: "Windows 11", value: "Win11" },
                        { name: "Windows 10", value: "Win10" },
                        { name: "Windows 7", value: "Win7" },
                      ]}
                      selected={answers.windows}
                      onSelected={(value) => {
                        setAnswers((prev) => ({
                          ...prev,
                          windows: value,
                        }));
                      }}
                    />
                  </View>
                )}
                {answers.windowscheck && (
                  <TouchableOpacity
                    className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                    onPress={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        orjinal: !prev.orjinal,
                      }))
                    }
                    activeOpacity={0.5}
                  >
                    <Text className="font-gregular text-lg">
                      Windows'um Orjinal Lisanslı Olsun ( 250TL )
                    </Text>

                    <CheckBox
                      isChecked={answers.orjinal}
                      onClick={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          orjinal: !prev.orjinal,
                        }));
                      }}
                      style={{ marginRight: 12 }}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      guvenlik: !prev.guvenlik,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Ek bir güvenlik yazılımı yüklemek ister misiniz? ( 100TL )
                  </Text>

                  <CheckBox
                    isChecked={answers.guvenlik}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        guvenlik: !prev.guvenlik,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      temizlik: !prev.temizlik,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Cihazın iç-dış temizliği / bakımı yapılsın mı? ( 150TL )
                  </Text>

                  <CheckBox
                    isChecked={answers.temizlik}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        temizlik: !prev.temizlik,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      iconay: !prev.iconay,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Cihazın içini açmamız gerekirse onayınız var mı?
                  </Text>

                  <CheckBox
                    isChecked={answers.iconay}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        iconay: !prev.iconay,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      cihazparca: !prev.cihazparca,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Cihazda parça değişimi gerekirse onaylıyor musunuz?
                  </Text>

                  <CheckBox
                    isChecked={answers.cihazparca}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        cihazparca: !prev.cihazparca,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>

                {answers.cihazparca && (
                  <TouchableOpacity
                    className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                    onPress={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        malzemeart: !prev.malzemeart,
                      }))
                    }
                    activeOpacity={0.5}
                  >
                    <Text className="font-gregular text-lg">
                      İşlem sonrası değiştirilen parçalar size gönderilsin mi
                      yoksa değerlendirilsin mi ?
                    </Text>

                    <CheckBox
                      isChecked={answers.malzemeart}
                      onClick={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          malzemeart: !prev.malzemeart,
                        }));
                      }}
                      style={{ marginRight: 12 }}
                    />
                  </TouchableOpacity>
                )}

                <View className="w-full h-auto border-b-[0.5px]">
                  <Text className="font-gregular text-xl ">
                    Ram Eklemek İstiyorum
                  </Text>
                  <RadioBox
                    items={[
                      { name: "Hayır", value: "0" },
                      { name: "2 GB Ek", value: "2GB" },
                      { name: "4 GB Ek", value: "4GB" },
                      { name: "8 GB Ek", value: "8GB" },
                      { name: "16 GB Ek", value: "16GB" },
                      { name: "32 GB Ek", value: "32GB" },
                    ]}
                    selected={answers.rammiktar}
                    onSelected={(value) => {
                      setAnswers((prev) => ({
                        ...prev,
                        rammiktar: value,
                      }));
                    }}
                  />
                </View>
                <View className="w-full h-auto border-b-[0.5px]">
                  <Text className="font-gregular text-xl ">
                    SSD / Harddisk Eklemek İstiyorum
                  </Text>
                  <RadioBox
                    items={[
                      { name: "Hayır", value: "0" },
                      { name: "500GB HDD", value: "500HDD" },
                      { name: "1TB HDD", value: "1TBHDD" },
                      { name: "2TB HDD", value: "2TBHDD" },
                      { name: "120GB SSD", value: "120SSD" },
                      { name: "240GB SSD", value: "240SSD" },
                      { name: "480GB SSD", value: "480SSD" },
                      { name: "1TB SSD", value: "1TBSSD" },
                    ]}
                    selected={answers.ssdmiktar}
                    onSelected={(value) => {
                      setAnswers((prev) => ({
                        ...prev,
                        ssdmiktar: value,
                      }));
                    }}
                  />
                </View>
              </>
            )}

            {(pctamir?.cihaz === "telefon" || pctamir?.cihaz === "tablet") && (
              <>
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      bilgicheck: !prev.bilgicheck,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Telefon / Tablet de Bilgiler Varmı ?
                  </Text>

                  <CheckBox
                    isChecked={answers.bilgicheck}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        bilgicheck: !prev.bilgicheck,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>

                {answers.bilgicheck && (
                  <TouchableOpacity
                    className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                    onPress={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        yedek: !prev.yedek,
                      }))
                    }
                    activeOpacity={0.5}
                  >
                    <Text className="font-gregular text-lg">
                      Önemli Bilgileriniz İşlemden Önce Gerekirse Yedekleyeceğiz
                      Onaylıyor musunuz ?
                    </Text>

                    <CheckBox
                      isChecked={answers.yedek}
                      onClick={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          yedek: !prev.yedek,
                        }));
                      }}
                      style={{ marginRight: 12 }}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      windowscheck: !prev.windowscheck,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    İşlem sonrası Yeniden Yazılım Yükleme / Reset yapılsın mı?
                  </Text>

                  <CheckBox
                    isChecked={answers.windowscheck}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        windowscheck: !prev.windowscheck,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      iconay: !prev.iconay,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Cihazın içini açmamız gerekirse onayınız var mı?
                  </Text>

                  <CheckBox
                    isChecked={answers.iconay}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        iconay: !prev.iconay,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      cihazparca: !prev.cihazparca,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Cihazda parça değişimi gerekirse onaylıyor musunuz?
                  </Text>

                  <CheckBox
                    isChecked={answers.cihazparca}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        cihazparca: !prev.cihazparca,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>

                {answers.cihazparca && (
                  <TouchableOpacity
                    className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                    onPress={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        malzemeart: !prev.malzemeart,
                      }))
                    }
                    activeOpacity={0.5}
                  >
                    <Text className="font-gregular text-lg">
                      İşlem sonrası değiştirilen parçalar size gönderilsin mi
                      yoksa değerlendirilsin mi ?
                    </Text>

                    <CheckBox
                      isChecked={answers.malzemeart}
                      onClick={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          malzemeart: !prev.malzemeart,
                        }));
                      }}
                      style={{ marginRight: 12 }}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}

            {(pctamir?.cihaz === "monitor" || pctamir?.cihaz === "yazici") && (
              <>
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      iconay: !prev.iconay,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Cihazın içini açmamız gerekirse onayınız var mı?
                  </Text>

                  <CheckBox
                    isChecked={answers.iconay}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        iconay: !prev.iconay,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      cihazparca: !prev.cihazparca,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Cihazda parça değişimi gerekirse onaylıyor musunuz?
                  </Text>

                  <CheckBox
                    isChecked={answers.cihazparca}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        cihazparca: !prev.cihazparca,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>

                {answers.cihazparca && (
                  <TouchableOpacity
                    className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                    onPress={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        malzemeart: !prev.malzemeart,
                      }))
                    }
                    activeOpacity={0.5}
                  >
                    <Text className="font-gregular text-lg">
                      İşlem sonrası değiştirilen parçalar size gönderilsin mi
                      yoksa değerlendirilsin mi ?
                    </Text>

                    <CheckBox
                      isChecked={answers.malzemeart}
                      onClick={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          malzemeart: !prev.malzemeart,
                        }));
                      }}
                      style={{ marginRight: 12 }}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
            {pctamir?.cihaz === "oyunkonsol" && (
              <>
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      windowscheck: !prev.windowscheck,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    İşlem sonrası Oyun Konsoluna format atılsın mı?
                  </Text>

                  <CheckBox
                    isChecked={answers.windowscheck}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        windowscheck: !prev.windowscheck,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      iconay: !prev.iconay,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Cihazın içini açmamız gerekirse onayınız var mı?
                  </Text>

                  <CheckBox
                    isChecked={answers.iconay}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        iconay: !prev.iconay,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      cihazparca: !prev.cihazparca,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Cihazda parça değişimi gerekirse onaylıyor musunuz?
                  </Text>

                  <CheckBox
                    isChecked={answers.cihazparca}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        cihazparca: !prev.cihazparca,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>

                {answers.cihazparca && (
                  <TouchableOpacity
                    className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                    onPress={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        malzemeart: !prev.malzemeart,
                      }))
                    }
                    activeOpacity={0.5}
                  >
                    <Text className="font-gregular text-lg">
                      İşlem sonrası değiştirilen parçalar size gönderilsin mi
                      yoksa değerlendirilsin mi ?
                    </Text>

                    <CheckBox
                      isChecked={answers.malzemeart}
                      onClick={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          malzemeart: !prev.malzemeart,
                        }));
                      }}
                      style={{ marginRight: 12 }}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}

            {pctamir?.cihaz === "diger" && (
              <>
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      windowscheck: !prev.windowscheck,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    İşlem sonrası Cihazınıza reset atılsın mı?
                  </Text>

                  <CheckBox
                    isChecked={answers.windowscheck}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        windowscheck: !prev.windowscheck,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      iconay: !prev.iconay,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Cihazın içini açmamız gerekirse onayınız var mı?
                  </Text>

                  <CheckBox
                    isChecked={answers.iconay}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        iconay: !prev.iconay,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      cihazparca: !prev.cihazparca,
                    }))
                  }
                  activeOpacity={0.5}
                >
                  <Text className="font-gregular text-lg">
                    Cihazda parça değişimi gerekirse onaylıyor musunuz?
                  </Text>

                  <CheckBox
                    isChecked={answers.cihazparca}
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        cihazparca: !prev.cihazparca,
                      }));
                    }}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>

                {answers.cihazparca && (
                  <TouchableOpacity
                    className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
                    onPress={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        malzemeart: !prev.malzemeart,
                      }))
                    }
                    activeOpacity={0.5}
                  >
                    <Text className="font-gregular text-lg">
                      İşlem sonrası değiştirilen parçalar size gönderilsin mi
                      yoksa değerlendirilsin mi ?
                    </Text>

                    <CheckBox
                      isChecked={answers.malzemeart}
                      onClick={() => {
                        setAnswers((prev) => ({
                          ...prev,
                          malzemeart: !prev.malzemeart,
                        }));
                      }}
                      style={{ marginRight: 12 }}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
            <TouchableOpacity
              className="w-full h-auto border-b-[0.5px] flex my-1 flex-row items-center justify-between"
              onPress={() =>
                setAnswers((prev) => ({
                  ...prev,
                  notify: !prev.notify,
                }))
              }
              activeOpacity={0.5}
            >
              <Text className="font-gregular text-lg">
                İşlem belli bir bütçeyi aşarsa bilgilendirme yapılsın mı ?
              </Text>

              <CheckBox
                isChecked={answers.notify}
                onClick={() => {
                  setAnswers((prev) => ({
                    ...prev,
                    notify: !prev.notify,
                  }));
                }}
                style={{ marginRight: 12 }}
              />
            </TouchableOpacity>

            {answers.notify && (
              <View className="w-full h-auto">
                <Text className="font-gregular text-lg ">
                  Bu Bütçeyi belirleyin ( TL )
                </Text>
                <TextInput
                  mode="flat"
                  value={answers.limit}
                  onChangeText={(text) =>
                    setAnswers((prev) => ({
                      ...prev,
                      limit: text,
                    }))
                  }
                />
              </View>
            )}

            <View className="mb-20 mt-2">
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
                Onaylıyor Musunuz ?
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Repair8;
