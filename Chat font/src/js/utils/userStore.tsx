import React, { createContext, useState, useEffect, ReactNode } from "react";

// 定义上下文的类型
interface StoreContextType {
  token: string;
  setToken: (token: string) => void;
}

// 创建上下文并设置初始值类型
export const StoreContext = createContext<StoreContextType | null>(null);

interface StoreContextProviderProps {
  children: ReactNode;
}

const StoreContextProvider: React.FC<StoreContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>("");

  // 在组件挂载时检查本地存储中的令牌
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // 设置令牌并保存到本地存储
  const setTokenAndStore = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const contextValue: StoreContextType = {
    token, // 用户认证令牌
    setToken: setTokenAndStore, // 设置认证令牌的函数
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
