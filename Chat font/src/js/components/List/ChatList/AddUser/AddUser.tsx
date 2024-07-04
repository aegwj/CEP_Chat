
import { collection } from 'firebase/firestore';
import './AddUser.css';
import { useContext, useState, useEffect } from "react";

const AddUser = () => {
   const [user,setUser] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);


      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data())
      }
    } catch (err) {
      console.log(err);
    }
  }; 

  const handleAdd = async () => {
    if(!user) return;

    try {
      const userRef = doc(db, "userchats", currentUser.id);
      const docSnap = await getDoc(userRef);

      const chats = docSnap.data().chats || [];

      const newChat = {
        receiverId: user.id,
        user: user,
        timestamp: new Date().getTime(),
        lastMessage: "",
        read: false
      }

      await updateDoc(userRef, {
        chats: [...chats, newChat]
      })

      fetchChats();
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div className="adduser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="userName" name="username" />
        <button>Search</button>
      </form>
      {user && <div className='user'>
        <div className='detail'>
          <img src={user.avatar || "./avatar.png"} alt="" />
          <span>{user.username }</span>
        </div>
        <button onClick={handleAdd}>Add User</button>
      </div>}
      
    </div>
  );
};

export default AddUser;

