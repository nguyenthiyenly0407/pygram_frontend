import React, { useState, useEffect } from 'react';
import avatar from './image/avata.png';
import TabBar from './tabbar';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import './Message.css';
const Message = () => {
    const [activePage, setActivePage] = useState('Message');
    
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-2'>
                    <TabBar setActivePage={setActivePage} activePage={activePage} />
                    <div className="underline"></div>
                </div>
                <div className='col-3 list'>
                    <ChatList></ChatList>
                </div>
                
                <div className='col-6'>
                    {localStorage.getItem("conversationId") && (<ChatWindow></ChatWindow>)}
                </div>
            </div>

        </div>
    );
}

export default Message;
