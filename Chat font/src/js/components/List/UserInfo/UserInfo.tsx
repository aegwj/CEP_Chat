
import './UserInfo.css';
import { useContext, useState, useEffect } from "react";
import { useUserStore } from '../../../utils/userStore';

const UserInfo = () => {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  return (
    <div className="userinfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className='icons'>
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />

      </div>

    </div>
  );
};

export default UserInfo;
