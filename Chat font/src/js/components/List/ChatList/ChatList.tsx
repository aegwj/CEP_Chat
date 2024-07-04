
import './ChatList.css';
import { useState, useEffect } from "react";
import AddUser from "./AddUser/AddUser.jsx";
import { doc, onSnapshot } from "firebase/firestore";
import { useUserStore } from '../../../utils/userStore.js';
import { db } from "../../../lib/firebase.js";

const ChatList = () => {
  const [chats, setChats] = useState(false)
  const [addMode, setAddMode] = useState(false);


  const { currentUser } = useUserStore();

  useEffect(() => {
    const fetchChats = async () => {
      const docRef = doc(db, "userchats", currentUser.id);
      const docSnap = await getDoc(docRef);

      const chatData = docSnap.data().chats.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return { ...item, user };
      });
      const data = await Promise.all(chatData);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    };

    fetchChats();

    return () => { };
  }, [currentUser.id]);


  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {chats?.map((chat) => (
        <div className="item">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Ae gwj</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
