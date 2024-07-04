
import './List.css';
import { useContext, useState, useEffect } from "react";
import ChatList from "./ChatList/ChatList.js";
import Userinfo from "./UserInfo/UserInfo.js";

const List = () => {
  return (
    <div className="list">
      <Userinfo/>
      <ChatList/>
    </div>
  );
};

export default List;
