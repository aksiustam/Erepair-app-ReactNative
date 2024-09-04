"use client";
import React, { useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import "./chat.css";
import useSWR, { mutate } from "swr";
import putChat from "@/app/actions/Chat/putChat";
import appChat from "@/app/actions/Chat/appChat";
import { v4 as uuidv4 } from "uuid";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { tr } from "date-fns/locale";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Conversation,
  ConversationList,
  Search,
  Sidebar,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { FaTrash } from "react-icons/fa";
import archiveChat from "@/app/actions/Chat/archiveChat";
import setChat from "@/app/actions/Chat/setChat";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ChatPage = () => {
  const { data: chat1, isLoading: chatload } = useSWR("/api/chatweb", fetcher, {
    refreshInterval: 30000,
  });
  const { data: user1, isLoading: userload } = useSWR(
    "/api/user/alluser",
    fetcher
  );
  const chatData = chatload ? [] : chat1;
  const userData = userload ? [] : user1;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [chatId, setChatId] = useState(null);

  const userDataList = userData.map((item) => {
    return {
      title: item.name,
      subtitle: "Yazmaya Başlayın...",
      date: new Date().toISOString(),
      unread: 0,
      chat: [],
      archive: false,
      userId: item.id,
    };
  });

  const filteredList = chatData.filter((item) => {
    const isItemMatchingSearch =
      search.trim() === "" ||
      item.title.toLowerCase().includes(search.trim().toLowerCase());

    if (search.trim() === "") {
      return item.archive === false;
    }

    return isItemMatchingSearch;
  });

  console.log(chatData);
  const userDataMatchingSearch = userDataList.filter(
    (user) =>
      search.trim() !== "" &&
      user.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  const combinedList = [
    ...filteredList,
    ...userDataMatchingSearch.filter(
      (user) =>
        !filteredList.some(
          (item) => user.title.toLowerCase() === item.title.toLowerCase()
        )
    ),
  ];

  const chatList = combinedList?.find((item) => item.id === chatId);

  const chatListData = chatList?.chat ? [...chatList?.chat].reverse() : [];

  const onClick = async (item) => {
    console.log(item);
    if (item.id) {
      setChatId(item.id);
      const formData = { ...item, unread: 0, archive: false };
      await putChat(formData);
      mutate("/api/chatweb");
    } else {
      const chatdataid = await setChat(item);
      mutate("/api/chatweb");
      setChatId(chatdataid.id);
    }
  };
  const handleKeyUp = async (text) => {
    chatData?.forEach((item) => {
      if (chatList.id === item.id) {
        item.subtitle = text;
        item.date = new Date().toISOString();
        item.unread = 0;
        let chatData = {
          _id: uuidv4(),
          text: text,
          createdAt: new Date().toISOString(),
          user: {
            _id: 0,
            name: "Admin",
          },
        };
        item.chat.unshift(chatData);
      }
    });
    await appChat(chatList, text);
    mutate("/api/chatweb");
  };

  const handleArchive = async (item) => {
    let bucket = { ...item, archive: true };

    await archiveChat(bucket);
    mutate("/api/chatweb");
  };

  const formatDateNoSuffix = (date) => {
    if (date)
      return formatDistanceToNowStrict(new Date(date), {
        addSuffix: false,
        locale: tr,
      });
  };
  const formatDate = (date) => {
    if (date)
      return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: tr,
      });
  };

  return (
    <>
      <div className="absolute bottom-6 right-6">
        <div
          className="flex items-center justify-center p-2 bg-blue-gray-600 rounded-full z-10 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <IoChatbubbleEllipsesOutline size={36} color="white" />
        </div>
      </div>
      {open && (
        <div className="absolute bottom-4 right-28">
          <div className="w-full h-auto z-30">
            <MainContainer
              responsive
              style={{
                height: "500px",
                width: "100%",
              }}
            >
              <Sidebar position="left" className="min-w-fit">
                <Search
                  placeholder="Ara..."
                  value={search}
                  onChange={(e) => setSearch(e)}
                  onClearClick={() => setSearch("")}
                />
                <ConversationList>
                  {combinedList.map((item) => {
                    const date = formatDateNoSuffix(item.date);
                    return (
                      <Conversation
                        key={item.id}
                        info={item.subtitle}
                        name={item.title}
                        unreadCnt={item.unread}
                        lastActivityTime={date}
                        onClick={() => onClick(item)}
                      />
                    );
                  })}
                </ConversationList>
              </Sidebar>
              <ChatContainer>
                <ConversationHeader>
                  <ConversationHeader.Content
                    info={formatDate(chatList?.date)}
                    userName={chatList?.title}
                  />
                  <ConversationHeader.Actions>
                    <FaTrash
                      size={25}
                      color="red"
                      className="cursor-pointer"
                      onClick={() => handleArchive(chatList)}
                    />
                  </ConversationHeader.Actions>
                </ConversationHeader>
                <MessageList>
                  {chatListData &&
                    chatListData?.map((item) => {
                      const sender = item.user.name;
                      const direction =
                        sender !== "Admin" ? "incoming" : "outgoing";
                      const message = item.text;
                      const date = formatDate(item.createdAt);
                      return (
                        <Message
                          key={item.id}
                          model={{
                            direction: direction,
                            message: message,
                            sender: sender,
                            sentTime: date,
                          }}
                        />
                      );
                    })}
                </MessageList>
                <MessageInput
                  placeholder="Mesaj Yazınız..."
                  attachButton={false}
                  onSend={(text) => handleKeyUp(text)}
                />
              </ChatContainer>
            </MainContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPage;
