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

interface ChatProps {
  currentUser: { id: string; avatar: string };
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


  // 退出登录
  const handleSettingsClick = () => {

  }
  // 链接官网
  const handleButtonClick = () => {
    const urlToOpen = "https://www.aegwj.com"; // The URL you want to open
    openLinkInBrowser(urlToOpen);
  };


  // 图片双击下载并导入AE
  const handleImageDoubleClick = async (imageUrl:any) => {
    const imageName = imageUrl.split('/').pop(); // 获取imageUrl的基本名称

    try {
      // 发起网络请求获取图片数据
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

      // 检查文件夹是否存在，如果不存在则创建
      const desktopFolderPath = "E:/果味酱CG小屋(aegwj.com)"; // 本地文件夹路径
      const dirExists = window.cep.fs.stat(desktopFolderPath).err === window.cep.fs.NO_ERROR;

      if (!dirExists) {
        window.cep.fs.makedir(desktopFolderPath, window.cep.fs.PERMISSION_READ | window.cep.fs.PERMISSION_WRITE);
      }

      // 拼接图片保存的完整路径
      const imagePath = `${desktopFolderPath}/${imageName}`;

      // 写入文件
      const fs = require('fs');
      const buffer = Buffer.from(response.data as ArrayBuffer);

      fs.writeFileSync(imagePath, buffer);

      // 导入AE
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
      // alert(`${imageName} downloaded and imported to AE`); // 下载成功提示

    } catch (error) {
      console.error('Error downloading or importing image:', error);
    }
    

  };


  // 格式化日期
  const formatDateTime = (datetime: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formatter = new Intl.DateTimeFormat(undefined, options);
    const formattedDate = formatter.format(datetime);
    const today = new Date();
    return datetime.toDateString() === today.toDateString() ? formatter.format(datetime) : `${formattedDate} ${formatter.format(datetime)}`;
  };


  // 发送图片
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
  // 发送消息
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
      {/* Top section */}
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

      {/* Image preview section */}
      {filePreview && (
        <div className="image-preview">
          <img src={filePreview} alt="Preview" />
        </div>
      )}

      {/* Chat messages display section */}
      <div className="center">
        {chats.map((chat, index) => (
          <div key={index} className={`message ${chat.username === currentUser.id ? "own" : "other"}`}>
            <img src={`http://localhost:3001${chat.avatar}` || avatar} alt="Avatar" className="avatar" />
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
              <span>{formatDateTime(new Date(chat.createdAt))}</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      {/* Bottom input section */}
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
