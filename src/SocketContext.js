import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [currentRoom, setCurrentRoom] = useState('');
  const [newLoginUser, setNewLoginUser] = useState(null);
  const [newLogoutUser, setNewLogoutUser] = useState(null);
  const [userslogin, setUsersLogin] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('newMessage', (data) => {
    setNewMessage(data.message);
    });

    newSocket.on('newLogin', (data) => {
      setUsersLogin(data.usersLogin);
      setNewLoginUser(data.newlogin);
    })

    newSocket.on('newLogout', (data) => {
      setUsersLogin(data.usersLogin);
      console.log('newLogout');
      setNewLogoutUser(data.newLogout);
    })
    return () => newSocket.close();
  }, []);

  const joinRoom = (room) => {
    if (socket) {
      socket.emit('joinRoom', { room });
    }
  };

  const send = (message) => {
    console.log(message);
    if (socket) {
      socket.emit('sendMessage', { message });
    }
  };

  const login = (data) => {
    if (socket) {
      socket.emit('login', data);
    }
  };
  const logout = (data) => {
    if (socket) {
      console.log("logoutlogoutlogoutlogoutlogoutlogout");
      socket.emit('logout', data);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, newMessage, joinRoom, send, newLoginUser, newLogoutUser, login, logout,userslogin }}>
      {children}
    </SocketContext.Provider>
  );
};
