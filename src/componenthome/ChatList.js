// src/ChatList.js
import React, { useEffect, useState } from 'react';
import ChatItem from './ChatItem';
import './ChatList.css';
import avatar from './image/avata.png';
import Axios from 'axios';

const ChatList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const filteredChats = data.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const fetchData = async () => {
    try {
      const apiUrl = 'http://localhost:5000/api/conversations/'+ localStorage.getItem('userId');
      const res = await Axios.get(apiUrl);

        setData(res.data.map(item => {
          return {
            
              avatar: avatar,
              name: item.name,
              message: "New message",
              time: "Fri",
              status: "online",
              conversationId: item.conversationId
            
          }
        }));
     
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h2>Chats</h2>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="chat-search-input"
        />
      </div>
      <div className="chat-list">
        {filteredChats.map((chat, index) => (
          <ChatItem
            key={index}
            avatar={chat.avatar}
            name={chat.name}
            message={chat.message}
            time={chat.time}
            status={chat.status}
            conversationId={chat.conversationId}

          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
