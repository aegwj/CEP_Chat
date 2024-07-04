import React, { useRef, useState, useEffect } from "react";
import './Chat.scss';
import EmojiPicker from "emoji-picker-react";
import img from "../../assets/img.png";
import camera from "../../assets/camera.png";
import mic from "../../assets/mic.png";
import info from "../../assets/info.png";
import goOut from "../../assets/goOut.png";
import avatar from "../../assets/avatar.png";
import emojiimg from "../../assets/emoji.png";
import { openLinkInBrowser } from '../../lib/utils/bolt';
import axios from 'axios';
import { evalES } from '../../lib/utils/bolt';
import moment from 'moment';

interface ChatProps {
  currentUser: { id: string; avatar: string; };
  chats: any[];
  addMessage: (message: string) => void;
  handleLogout: () => void;
}

const Chat: React.FC<ChatProps> = ({ currentUser, chats, addMessage, handleLogout }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const handleEmoji = (e: { emoji: string }) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSettingsClick = () => {
    // 退出登录的处理逻辑
  };

  const handleButtonClick = () => {
    const urlToOpen = "https://www.aegwj.com"; // 要打开的 URL
    openLinkInBrowser(urlToOpen);
  };

  const handleImageDoubleClick = async (imageUrl: any) => {
    const imageName = imageUrl.split('/').pop(); // 获取 imageUrl 的基本名称

    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

      const desktopFolderPath = "E:/果味酱CG小屋(aegwj.com)"; // 本地文件夹路径
      const dirExists = window.cep.fs.stat(desktopFolderPath).err === window.cep.fs.NO_ERROR;

      if (!dirExists) {
        window.cep.fs.makedir(desktopFolderPath, window.cep.fs.PERMISSION_READ | window.cep.fs.PERMISSION_WRITE);
      }

      const imagePath = `${desktopFolderPath}/${imageName}`;
      const fs = require('fs');
      const buffer = Buffer.from(response.data as ArrayBuffer);

      fs.writeFileSync(imagePath, buffer);

      const escapedImagePath = imagePath.replace(/\\/g, "\\\\");
      evalES(
        `
        var importImageToComp = function(imagePath) {
          var project = app.project;
          var activeItem = project.activeItem;
          if (activeItem && activeItem instanceof CompItem) {
            var importedFile = new ImportOptions(File(imagePath));
            var importedItem = project.importFile(importedFile);
            var layer = activeItem.layers.add(importedItem);
            layer.property("Transform").property("Position").setValue([activeItem.width / 2, activeItem.height / 2]);
          }
        };
        importImageToComp("${escapedImagePath}");
      `,
        true
      );
    } catch (error) {
      console.error('Error downloading or importing image:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            const MAX_WIDTH = 100;
            const MAX_HEIGHT = 100;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const dataurl = canvas.toDataURL('image/png');
            setFilePreview(dataurl); // 设置预览图像
          };
          img.src = reader.result as string;
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSendMessage = async () => {
    if (text.trim() !== "" || file) {
      let message = text;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await axios.post('http://localhost:3001/upload-file', formData);
          const imageUrl = response.data.url;
          message += ` ![file preview](${filePreview}) [file]: http://localhost:3001${imageUrl}`; // 将预览图像的 URL 包含在消息中
          setFile(null);
          setFilePreview(null);
        } catch (error) {
          console.error("Failed to upload image", error);
          return;
        }
      }

      addMessage(message);
      setText("");
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={`http://localhost:3001${currentUser.avatar}` || avatar} alt="Avatar" />
          <div className="texts">
            <span>{currentUser.id}</span>
            <p>果味酱CG小屋，专注影视后期资源，CG技术
              <button onClick={handleButtonClick}>官网</button>
            </p>
          </div>
        </div>
        <div className="icons">
          <img src={goOut} alt="Logout" onClick={handleLogout} />
          <img src={info} alt="Settings" onClick={handleSettingsClick} />
        </div>
      </div>

      {filePreview && (
        <div className="image-preview">
          <img src={filePreview} alt="Preview" />
        </div>
      )}

      <div className="center">
        {chats.map((chat, index) => (
          <div key={index} className={`message ${chat.username === currentUser.id ? "own" : "other"}`}>
            <div className="user-info">
              <img src={`http://localhost:3001${chat.avatar}` || avatar} alt="Avatar" className="avatar" />
              <span className="username">{chat.username}</span>
            </div>
            <div className={`bubble ${chat.username === currentUser.id ? "own" : ""}`}>
              {chat.message.includes('[file]:') ? (
                <img
                  src={chat.message.split('[file]: ')[1]}
                  alt="Uploaded"
                  className="chat-image"
                  onDoubleClick={() => handleImageDoubleClick(chat.message.split('[file]: ')[1])}
                />
              ) : (
                <p>{chat.message}</p>
              )}
              <span className="timestamp">{moment(chat.timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <label htmlFor="file-upload">
            <img src={img} alt="Image" />
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <img src={camera} alt="Camera" />
          <img src={mic} alt="Mic" />
        </div>
        <textarea
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src={emojiimg}
            alt="Emoji"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="picker">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        <button className="sendButton" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
