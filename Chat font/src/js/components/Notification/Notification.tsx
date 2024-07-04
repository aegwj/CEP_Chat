
import './Notification.css';
import { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  return (
    <div className="notification">
      <ToastContainer position= "bottom-right"/>
    </div>
  );
};

export default Notification;
