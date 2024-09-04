import { View, Text, StatusBar, Alert, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GiftedChat, Send } from "react-native-gifted-chat";
import axios from "axios";
import { useGlobalContext } from "../../context/GlobalProvider";
import { API_URL } from "../../lib/config";

const renderSend = (props) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 66,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 4,
    }}
  >
    <Text className="font-gbold text-2xl text-blue-500">Gönder</Text>
  </Send>
);

const ChatPage = () => {
  const [text, setText] = useState("");
  const { user, logged } = useGlobalContext();
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    const useChat = async () => {
      try {
        if (logged) {
          const response = await axios.get(API_URL + `api/chat?id=${user.id}`);

          if (response.data && response.data.chat.length >= 1) {
            setChatData(response.data.chat);
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          Alert.alert(
            "İnternet Bağlantısı Hatası",
            "Lütfen internet bağlantınızı kontrol edin.",
            [{ text: "Tamam" }]
          );
        }
      }
    };
    useChat();

    const intervalId = setInterval(useChat, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const temizle = false;
  if (temizle) {
    setChatData([]);
  }

  const onSend = useCallback(
    async (sendmessage) => {
      const sendData = sendmessage[0];
      const sentMessages = [{ ...sendData }];

      if (chatData.length <= 0) {
        const chat = [
          {
            _id: sendData._id,
            createdAt: sendData.createdAt,
            text: sendData.text,
            user: {
              _id: user.id,
              name: user.name,
            },
          },
        ];

        const formData = {
          title: user.name,
          subtitle: sendData.text,
          date: sendData.createdAt,
          unread: 1,
          chat: chat,
          archive: false,
          userId: user.id,
        };
        const response = await axios.post(API_URL + `api/chat`, formData);
        if (response.data) {
          setChatData(GiftedChat.append(chatData, sentMessages));
        }
      } else {
        const chat = {
          _id: sendData._id,
          createdAt: sendData.createdAt,
          text: sendData.text,
          user: {
            _id: user.id,
            name: user.name,
          },
        };
        const formData = {
          subtitle: sendData.text,
          date: sendData.createdAt,
          unread: 1,
          chat: chat,
          archive: false,
        };
        const response = await axios.put(
          API_URL + `api/chat?id=${user.id}`,
          formData
        );
        if (response.data) {
          setChatData(GiftedChat.append(chatData, sentMessages));
        }
      }
    },
    [chatData]
  );

  return (
    <>
      <SafeAreaView className="w-full h-full bg-white">
        <View className="w-full h-full">
          <GiftedChat
            messages={chatData}
            text={text}
            onInputTextChanged={setText}
            onSend={onSend}
            user={{
              _id: user.id,
              name: user.name,
            }}
            //   parsePatterns={parsePatterns}  özel karakterleri style
            alignTop
            alwaysShowSend
            scrollToBottom
            infiniteScroll
            renderAvatar={null}
            keyboardShouldPersistTaps="never"
            renderSend={renderSend}
            placeholder={"Mesaj yazmaya başlayın..."}
            timeFormat={"HH:MM"}
            dateFormat={"DD.MM.YYYY"}
          />
        </View>
      </SafeAreaView>
      <StatusBar translucent backgroundColor="transparent" />
    </>
  );
};

export default ChatPage;
