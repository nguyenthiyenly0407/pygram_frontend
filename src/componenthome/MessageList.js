import React, { useEffect, useRef } from 'react';
import './MessageList.css';

const MessageList = ({ messages }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender === 'abc' ? 'sent' : 'received'}`}>
          {msg.text}
        </div>
      ))}
      <div ref={messageRef}></div>
    </div>
  );
};

export default MessageList;
