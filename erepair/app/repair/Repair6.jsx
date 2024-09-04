import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useReduxContext } from "../../context/ReduxProvider";
import SiviTemas from "../../components/comp/repair/CihazSorun/SiviTemas";
import AcilmamaPage from "../../components/comp/repair/CihazSorun/AcilmamaPage";
import YavaslamaPage from "../../components/comp/repair/CihazSorun/Yavaslama";
import DarbePage from "../../components/comp/repair/CihazSorun/Darbe";
import TamirOnarmaPage from "../../components/comp/repair/CihazSorun/TamirOnarma";
import YukseltHizlandirPage from "../../components/comp/repair/CihazSorun/YukseltHizlandir";
import KapanmaPage from "../../components/comp/repair/CihazSorun/Kapanma";
import HataPage from "../../components/comp/repair/CihazSorun/Hata";
import VeriKurtarmaPage from "../../components/comp/repair/CihazSorun/VeriKurtarma";
import GenelBakimPage from "../../components/comp/repair/CihazSorun/GenelBakim";
import VirusPage from "../../components/comp/repair/CihazSorun/Virus";
import SarjSorunPage from "../../components/comp/repair/CihazSorun/SarjSorun";
import YazilimsalPage from "../../components/comp/repair/CihazSorun/Yazilimsal";
import EkDonanimHataPage from "../../components/comp/repair/CihazSorun/EkDonanimHata";
import DigerPage from "../../components/comp/repair/CihazSorun/Diger";
import CihazSorunFinish from "../../components/comp/repair/CihazSorun/CihazSorunFinish";

const Repair6 = () => {
  const { pctamir } = useReduxContext();
  const [pageContent, setPageContent] = useState(1);

  const renderPage = () => {
    let bucket = pctamir;
    let sorundata = bucket?.sorun.filter((item) => item.check === false);
    // sorundata[0]?.name

    switch (sorundata[0]?.name) {
      case "acilmama":
        return (
          <AcilmamaPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );

      case "sıvıtemas":
        return (
          <SiviTemas
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );

      case "yavaslama":
        return (
          <YavaslamaPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );

      case "darbe":
        return (
          <DarbePage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );

      case "onarma":
        return (
          <TamirOnarmaPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );

      case "yukseltme":
        return (
          <YukseltHizlandirPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );

      case "kapanma":
        return (
          <KapanmaPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );
      case "hatalar":
        return (
          <HataPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );
      case "verikurtarma":
        return (
          <VeriKurtarmaPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );
      case "genelbakım":
        return (
          <GenelBakimPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );

      case "virus":
        return (
          <VirusPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );
      case "sarjsorunu":
        return (
          <SarjSorunPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );
      case "yazılımsal":
        return (
          <YazilimsalPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );
      case "ekdonanım":
        return (
          <EkDonanimHataPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );
      case "diger":
        return (
          <DigerPage
            pctamir={pctamir}
            setPageContent={setPageContent}
            sorundata={sorundata[0]}
          />
        );

      default:
        return <CihazSorunFinish setPageContent={setPageContent} />;
    }
  };
  useEffect(() => {
    if (pageContent === 0) {
      renderPage();
      setPageContent(1);
    }
  }, [pageContent]);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="w-full h-full justify-start items-center">
        <ScrollView
          contentContainerStyle={{
            flexDirection: "col",
            justifyContent: "center",
            paddingBottom: 0,
          }}
          style={{ flex: 1 }}
          className="w-full mb-12 "
        >
          {renderPage()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Repair6;
