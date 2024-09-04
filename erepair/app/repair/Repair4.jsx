import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import LaptopPage from "../../components/comp/repair/Laptop";
import TelefonPage from "../../components/comp/repair/Telefon";
import TabletPage from "../../components/comp/repair/Tablet";
import YaziciPage from "../../components/comp/repair/Yazici";
import OyunKonsolPage from "../../components/comp/repair/OyunKonsol";
import { useReduxContext } from "../../context/ReduxProvider";
import MonitorPage from "../../components/comp/repair/Monitor";
import BilgisayarPage from "../../components/comp/repair/Bilgisayar";

const Repair4 = () => {
  const { pctamir } = useReduxContext();

  const renderPage = () => {
    const key = pctamir?.cihaz;

    switch (key) {
      case "bilgisayar":
        return <BilgisayarPage />;
      case "laptop":
        return <LaptopPage />;

      case "telefon":
        return <TelefonPage />;

      case "tablet":
        return <TabletPage />;

      case "yazici":
        return <YaziciPage />;

      case "oyunkonsol":
        return <OyunKonsolPage />;

      case "monitor":
        return <MonitorPage />;

      default:
        break;
    }
  };

  return (
    <SafeAreaView className="bg-white w-full h-full ">
      {renderPage()}
    </SafeAreaView>
  );
};

export default Repair4;
