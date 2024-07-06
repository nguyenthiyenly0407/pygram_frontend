// src/ChatItem.js
import React from 'react';
import './ChatItem.css';
import ChatWindow from './ChatWindow';
import { useSocket } from '../SocketContext';

const ChatItem = ({ avatar, name, message, time, status, conversationId }) => {
  const { joinRoom } = useSocket();
  const onClick=()=> {
    localStorage.setItem("conversationId", conversationId);
    window.location.href = `/message/${localStorage.getItem('userId')}?conversationId=${conversationId}&conversationName=${name}`;
    localStorage.setItem("conversationName", name);
    joinRoom(conversationId);
  }
  return (
    <div className="chat-item" onClick={onClick}>
      <div className="avatar">
        <img src={avatar} alt="Avatar" />
        {status === 'online' && <span className="chat-status online"></span>}
      </div>
      <div className="chat-details">
        <div className="chat-header">
          <span className="chat-name">{name}</span>
        </div>
        <div className="chat-message">
          {message}
         
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
