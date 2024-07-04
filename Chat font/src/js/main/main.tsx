// Main.tsx

import React, { useState, useEffect } from "react";
import Login from "../components/Login/Login";
import Chat from "../components/Chat/Chat";
import "./main.scss";
import io from "socket.io-client";
import { registerUser, loginUser } from "../utils/api";
const Main = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [socketio, setSocketio] = useState<any>(null);
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:3001");
      setSocketio(socket);

      socket.on("chat", (chats: any[]) => {
        setChats(chats);
      });
      socket.on("message", (message: any) => {
        setChats((prevChats: any[]) => [...prevChats, message]);
      });

      return () => {
        socket.off("chat");
        socket.off("message");
      };
    }
  }, [user]);


  // 添加消息
  const addMessage = (chat: string) => {
    if (socketio) {
      const newChat = {
        username: localStorage.getItem("user"),
        message: chat,
        avatar: localStorage.getItem("avatar"),
      };
      socketio.emit("newMessage", newChat);
    }
  };



  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("user", response.data.username);
      localStorage.setItem("avatar", response.data.avatar);
      setUser(response.data.username);
      setIsLogin(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    setUser("");
    setIsLogin(false);
    if (socketio) {
      socketio.disconnect();
      setSocketio(null);
    }
  };

  return (
    <div className="main">
      {isLogin ? (
        <div className="chat-container">
          <Chat
            currentUser={{ id: user, avatar: localStorage.getItem("avatar") || "" }}
            chats={chats} // 传递聊天记录
            // 添加了avatar属性，因为在Chat.tsx中，我们使用了这个属性
            // 如果你不需要使用avatar属性，可以删除下面这行代码
            addMessage={addMessage} // 传递添加消息的方法
            handleLogout={handleLogout} // 传递处理登出的方法
          />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
     

    </div>
  );
};

export default Main;
