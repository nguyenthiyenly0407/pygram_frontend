import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './sideBar';
import MessageList from './MessageList';
import ChatBox from './Chatbox';
import PeopleList from './PeopleList';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState({ name: 'abc', email: 'abc@gmail.com' });
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    // Fetch initial data like conversations, users, etc.
  }, []);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // Fetch messages for the selected conversation
    setMessages([ /* Mock messages */ ]);
  };

  return (
    <div className="dashboard">
      <Sidebar user={user} onSelectConversation={handleSelectConversation} />
      <MessageList messages={messages} />
      <ChatBox conversation={selectedConversation} />
      <PeopleList onSelectConversation={handleSelectConversation} />
    </div>
  );
};

export default Dashboard;
