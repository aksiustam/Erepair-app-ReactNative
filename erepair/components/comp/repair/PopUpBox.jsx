import { View, Text, StyleSheet, Modal, Pressable, StatusBar } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";

const PopUpBox = ({ answers, setAnswers, pctamir }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [limittext, setLimittext] = useState("");
  const questions = () => {
    if (pctamir.cihaz === "bilgisayar" || pctamir.cihaz === "laptop") {
      return [
        { id: 0,name:"bilgicheck", text: "Bilgisayar / Laptopda Bilgiler Varmı ?",  type: "boolean" },
        { id: 1,name:"yedek", text: "Önemli Bilgilerinizi İşlemden Önce Gerekirse Yedekleyeceğiz Onaylıyor musunuz ?",  type: "boolean" },
        { id: 2,name:"windowscheck", text: "İşlem sonrası Bilgisayara format atılsın mı? ( 200 TL )",  type: "boolean" },
        { id: 3,name:"windows", text: "Hangi Windows'u tercih edersiniz ?",  type: "checkbox",
        checkbox:[{id:0,name:"Win11",text:"Windows 11"},{id:1,name:"Win10",text:"Windows 10"},{id:2,name:"Win7",text:"Windows 7"}]
         },
        { id: 4,name:"orjinal", text: "Windows'um Orjinal Lisanslı Olsun ( 250TL )",  type: "boolean" },
        { id: 5,name:"guvenlik", text: "Ek bir güvenlik yazılımı yüklemek ister misiniz? ( 100TL )",  type: "boolean" },
        { id: 6,name:"temizlik", text: "Cihazın iç-dış temizliği / bakımı yapılsın mı? ( 150TL )",  type: "boolean" },
        { id: 7,name:"iconay", text: "Cihazın içini açmamız gerekirse onayınız var mı?",  type: "boolean" },
        { id: 8,name:"cihazparca", text: "Cihazda parça değişimi gerekirse onaylıyor musunuz?",  type: "boolean" },
        { id: 9,name:"malzemeart", text: "İşlem sonrası değiştirilen parçalar size gönderilsin mi yoksa değerlendirilsin mi ?",  type: "boolean" },
        { id: 10,name:"rammiktar", text: "Ram Eklemek İstiyorum",  type: "checkbox",
            checkbox:[{id:0,name:"0",text:"Hayır"},{id:1,name:"2GB",text:"2 GB Ek"},{id:2,name:"4GB",text:"4 GB Ek"},
                {id:3,name:"8GB",text:"8 GB Ek"},{id:4,name:"16GB",text:"16 GB Ek"},{id:5,name:"32GB",text:"32 GB Ek"}]
         },

        { id: 11,name:"ssdmiktar", text: "SSD / Harddisk Eklemek İstiyorum",  type: "checkbox",
            checkbox:[{id:0,name:"0",text:"Hayır"},{id:1,name:"500HDD",text:"500GB HDD"},{id:2,name:"1TBHDD",text:"1TB HDD"},
                {id:3,name:"2TBHDD",text:"2TB HDD"},{id:4,name:"120SSD",text:"120GB SSD"},{id:5,name:"240SSD",text:"240GB SSD"},
                {id:6,name:"480SSD",text:"480GB SSD"},{id:7,name:"1TBSSD",text:"1TB SSD"}]
         },
        { id: 12,name:"notify", text: "İşlem belli bir bütçeyi aşarsa bilgilendirme yapılsın mı ?",  type: "boolean" },
        { id: 13,name:"limit", text: "Bu Bütçeyi belirleyin ( TL )",  type: "text" },
      ];
    }

    if (pctamir?.cihaz === "telefon" || pctamir?.cihaz === "tablet") {
      return [
        { id: 0,name:"bilgicheck", text: "Telefon / Tablet de Bilgiler Varmı ?",  type: "boolean" },
        { id: 1,name:"yedek", text: "Önemli Bilgilerinizi İşlemden Önce Gerekirse Yedekleyeceğiz Onaylıyor musunuz ?",  type: "boolean" },
        { id: 2,name:"windowscheck", text: "İşlem sonrası Yeniden Yazılım Yükleme / Reset yapılsın mı?",  type: "boolean" },
        { id: 3,name:"iconay", text: "Cihazın içini açmamız gerekirse onayınız var mı?",  type: "boolean" },
        { id: 4,name:"cihazparca", text: "Cihazda parça değişimi gerekirse onaylıyor musunuz?",  type: "boolean" },
        { id: 5,name:"malzemeart", text: "İşlem sonrası değiştirilen parçalar size gönderilsin mi yoksa değerlendirilsin mi ?",  type: "boolean" },
        { id: 6,name:"notify", text: "İşlem belli bir bütçeyi aşarsa bilgilendirme yapılsın mı ?",  type: "boolean" },
        { id: 7,name:"limit", text: "Bu Bütçeyi belirleyin ( TL )",  type: "text" },
      ];
    }

    if (pctamir?.cihaz === "monitor" || pctamir?.cihaz === "yazici") {
      return [
        { id: 0,name:"iconay", text: "Cihazın içini açmamız gerekirse onayınız var mı?",  type: "boolean" },
        { id: 1,name:"cihazparca", text: "Cihazda parça değişimi gerekirse onaylıyor musunuz?",  type: "boolean" },
        { id: 2,name:"malzemeart", text: "İşlem sonrası değiştirilen parçalar size gönderilsin mi yoksa değerlendirilsin mi ?",  type: "boolean" },
        { id: 3,name:"notify", text: "İşlem belli bir bütçeyi aşarsa bilgilendirme yapılsın mı ?",  type: "boolean" },
        { id: 4,name:"limit", text: "Bu Bütçeyi belirleyin ( TL )",  type: "text" },
      ];
    }
  
    if (pctamir?.cihaz === "oyunkonsol") {
      return [
        { id: 0,name:"windowscheck", text: "İşlem sonrası Oyun Konsoluna format atılsın mı ?",  type: "boolean" },
        { id: 1,name:"iconay", text: "Cihazın içini açmamız gerekirse onayınız var mı ?",  type: "boolean" },
        { id: 2,name:"cihazparca", text: "Cihazda parça değişimi gerekirse onaylıyor musunuz ?",  type: "boolean" },
        { id: 3,name:"malzemeart", text: "İşlem sonrası değiştirilen parçalar size gönderilsin mi yoksa değerlendirilsin mi ?",  type: "boolean" },
        { id: 4,name:"notify", text: "İşlem belli bir bütçeyi aşarsa bilgilendirme yapılsın mı ?",  type: "boolean" },
        { id: 5,name:"limit", text: "Bu Bütçeyi belirleyin ( TL )",  type: "text" },
      ];
    }
  
    if (pctamir?.cihaz === "diger") {
      return [
        { id: 0,name:"windowscheck", text: "İşlem sonrası Cihazınıza reset atılsın mı ?",  type: "boolean" },
        { id: 1,name:"iconay", text: "Cihazın içini açmamız gerekirse onayınız var mı ?",  type: "boolean" },
        { id: 2,name:"cihazparca", text: "Cihazda parça değişimi gerekirse onaylıyor musunuz ?", type: "boolean" },
        { id: 3,name:"malzemeart", text: "İşlem sonrası değiştirilen parçalar size gönderilsin mi yoksa değerlendirilsin mi ?",  type: "boolean" },
        { id: 4,name:"notify", text: "İşlem belli bir bütçeyi aşarsa bilgilendirme yapılsın mı ?",  type: "boolean" },
        { id: 5,name:"limit", text: "Bu Bütçeyi belirleyin ( TL )" , type: "text" },
      ];
    }
  };
  const handleAnswer = (question, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question.name]: value,
    }));
    let nextIndex = 0;
    if (question.name === "bilgicheck" && value === false) {
      nextIndex = currentQuestionIndex + 2;
    } else if (question.name === "cihazparca" && value === false) {
      nextIndex = currentQuestionIndex + 2;
    } else if (question.name === "notify" && value === false) {
      nextIndex = currentQuestionIndex + 2;
    } else if (
      (pctamir.cihaz === "bilgisayar" || pctamir.cihaz === "laptop") &&
      question.name === "windowscheck" &&
      value === false
    ) {
      nextIndex = currentQuestionIndex + 3;
    } else {
      nextIndex = currentQuestionIndex + 1;
    }
    if (nextIndex < questions().length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setModalVisible(false); // Tüm sorular bittiğinde modalı kapat
    }
  };

  const renderQuestion = () => {
    const question = questions()[currentQuestionIndex];

    if (question.type === "boolean") {
      return (
        <View className="mt-3 w-fit flex flex-row space-x-6 items-center justify-center">
          <Pressable
            onPress={() => handleAnswer(question, false)}
            className="bg-zinc-900 rounded-xl px-4 py-2"
          >
            <Text className="text-xl font-gregular">Hayır</Text>
          </Pressable>
          <Pressable
            onPress={() => handleAnswer(question, true)}
            className="bg-zinc-900 rounded-xl px-4 py-2"
          >
            <Text className="text-xl font-gregular">Evet</Text>
          </Pressable>
        </View>
      );
    } else if (question.type === "checkbox") {
      return (
        <View className=" w-fit flex flex-row flex-wrap gap-3 items-center justify-center">
          {question.checkbox.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => handleAnswer(question, item.name)}
              className="bg-zinc-900 rounded-xl px-4 py-2"
            >
              <Text className="text-xl font-gregular">{item.text}</Text>
            </Pressable>
          ))}
        </View>
      );
    } else if (question.type === "text") {
      return (
        <View className="w-48 h-auto">
          <TextInput
            mode="flat"
            value={limittext}
            onChangeText={(text) => setLimittext(text)}
            contentStyle={{ width: "auto" }}
          />
          <View className="w-full mt-3 flex items-center justify-center ">
            <View className="border border-gray-500 rounded-xl">
              <Pressable
                onPress={() => handleAnswer(question, limittext)}
                className="bg-zinc-900  rounded-xl px-4 py-2  "
              >
                <Text className="text-xl font-gregular">Tamam</Text>
              </Pressable>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <>
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.centeredView}>
          <View style={styles.modalView} className="px-6 py-6 ">
            <Text className="text-xl font-gregular mb-4 text-center">
              {questions()[currentQuestionIndex].text}
            </Text>
            <View>{renderQuestion()}</View>
          </View>
        </View>
      </View>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0.5)" />
    </Modal>
    </>
  );
};

export default PopUpBox;

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
