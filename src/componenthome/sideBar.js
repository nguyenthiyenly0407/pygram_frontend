import React from 'react';
import './SideBar.css';

const sideBar = ({ user, onSelectConversation }) => {
  const conversations = [
    { id: 1, name: 'def', email: 'def@gmail.com' }
  ];

  return (
    <div className="sidebar">
      <div className="user-details">
        <img src="path/to/tutorialsdev.png" alt="User" />
        <div>
          <h3>{user.name}</h3>
          <p>My Account</p>
        </div>
      </div>
      <div className="conversations">
        <h3>Messages</h3>
        {conversations.map(conv => (
          <div key={conv.id} className="conversation" onClick={() => onSelectConversation(conv)}>
            <img src="path/to/user.jpg" alt="User" />
            <div>
              <h4>{conv.name}</h4>
              <p>{conv.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default sideBar;
