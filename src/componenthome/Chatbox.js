import React, { useState } from 'react';
import './ChatBox.css';

const Chatbox = ({ conversation }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle send message
      setMessage('');
    }
  };

  return (
    <div className="chat-box">
      {conversation ? (
        <>
          <div className="chat-header">
            <img src="path/to/user.jpg" alt="User" />
            <div>
              <h3>{conversation.name}</h3>
              <p>{conversation.email}</p>
            </div>
            <button>Call</button>
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      ) : (
        <div className="no-conversation">No Conversation Selected</div>
      )}
    </div>
  );
};

export default Chatbox;
