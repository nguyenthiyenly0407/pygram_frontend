import React, { useEffect, useState } from 'react';
import './ChatWindow.css';
import avatar from './image/avata.png';
import { CommonUtils } from '../CommonUtils';
import Axios from 'axios';
const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage(message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const sendMessage = async (message) => {
    const apiUrl = 'http://localhost:5000/api/message';
    const postData = {
      conversationId: localStorage.getItem('conversationId'),
      message,
      senderId: localStorage.getItem('userId')
    };
    const response = await Axios.post(apiUrl, postData);
    if(response.status === 200) {
      const newMessage = {
        message: message,
        sender: "Me",
        isUser: true,
        time: CommonUtils.formatCurrentDate(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  }
  const fetchData = async () => {
    try {
      const apiUrl = 'http://localhost:5000/api/message/' + localStorage.getItem('conversationId');
      const res = await Axios.get(apiUrl);
      if (res.status === 200) {
        setMessages(res.data.map(item => {
          return  {
            message: item.message,
            sender: item.isUser ? "Me" :  localStorage.getItem('conversationName'),
            isUser: item.isUser,
            time: CommonUtils.formatDate(item.time),
          }
        }));
      }
      
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  return (
    <div className="chat-window-container">
      <div className="messages-container">
        <div>
          <p>
          <img src={avatar} alt="Avatar" style={{width: '30px', height: '30px'}}/>
            {localStorage.getItem("conversationName")}
          </p>
          <hr></hr>
        </div>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user-message' : 'other-message'}`}
          >
            <div className="message-content">
              {!message.isUser && 
                <div>
                  <p className="sender-name" style={{ fontSize: '15px' }}>
                    <img src={avatar} style={{ width: '25px', height: '25px' }} alt="avatar"/>
                    {message.sender}
                  </p>
                </div>
              }
              <p style={{ fontSize: '15px' }}>{message.message}</p>
              {/* <span className="message-time">{message.time}</span> */}
            </div>
          </div>
        ))}
      </div>
      <div className="message-input message-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
