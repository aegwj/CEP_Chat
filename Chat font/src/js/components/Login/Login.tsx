import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';
import { useState, useContext } from "react";
import axios from 'axios';
import avatarImg from "../../assets/avatar.png";
import { StoreContext } from "../../utils/userStore.jsx";
import React, { FormEvent } from 'react';

interface Avatar {
  file: File | null,
  url: string
}

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [avatar, setAvatar] = useState<Avatar>({
    file: null,
    url: ""
  });
  const [isLoginMode, setIsLoginMode] = useState(true); // 增加状态切换登录和注册模式

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post<{ url: string }>("http://localhost:3001/upload-avatar", formData);
      return response.data.url;
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      let imgUrl = "";
      if (avatar.file) {
        imgUrl = await uploadFile(avatar.file);
      }

      const response = await axios.post("http://localhost:3001/register", {
        username,
        email,
        password,
        avatar: imgUrl,
      });

      toast.success("账户创建成功!");

      setIsLoginMode(true); // 注册成功后切换到登录模式
    } catch (err: any) {
      console.log(err.response?.data);
      toast.error("创建账户失败");
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });

      toast.success("登录成功!");

      const { username, avatar } = response.data;

      onLogin(email, password);
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        toast.error("无效的邮箱或密码。");
      } else {
        toast.error("登录失败");
      }
      console.log(err);
    }
  };

  return (
    <div className="login">
      {isLoginMode ? (
        <div className="item">
          <h2>欢迎回来</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="邮箱" name="email" required />
            <input type="password" placeholder="密码" name="password" required />
            <button type="submit">登录</button>
          </form>
          <p onClick={() => setIsLoginMode(false)} className="switch">
            没有账户？点击注册
          </p>
        </div>
      ) : (
        <div className="item">
          <h2>创建账户</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="file">
              <img src={avatar.url || avatarImg} alt="" />
              上传图片
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleAvatar}
            />
            <input type="text" placeholder="用户名" name="username" required />
            <input type="email" placeholder="邮箱" name="email" required />
            <input type="password" placeholder="密码" name="password" required />
            <button type="submit">注册</button>
          </form>
          <p onClick={() => setIsLoginMode(true)} className="switch">
            已有账户？点击登录
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
