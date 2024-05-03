import React, { useState,  useEffect } from 'react';
import Whitehome from './image/whitehome.png';
import Blackhome from './image/blackhome.png';
import Whitenoti from './image/whitenotification.png';
import Blacknoti from './image/blacknotification.png';
import Whitemessage from './image/whitemessage.png';
import Blackmessage from './image/blackmessage.png';
import Whitecourse from './image/whitecourse.png';
import Blackcourse from './image/blackcourse.png';
import Whitesetting from './image/whitesetting.png';
import Blacksetting from './image/blacksetting.png';
import Whitelogout from './image/whitelogout.png';
import Blacklogout from './image/blacklogout.png';
import Webfont from 'webfontloader'
import { Redirect } from 'react-router-dom';

const TabBar = ({ setActivePage }) => {
   
    const [activeButton, setActiveButton] = useState("Home");
    


    useEffect(() => {
        Webfont.load({
            google: {
                families: ['Dancing Script', 'Roboto'] 
            }
        });
    }, []);
    const handleNotificationClick = () => {
        // Lấy userId từ localStorage
        const userId = localStorage.getItem('userIdhaha');
        // Chuyển hướng đến trang notification với userId
        window.location.href = `/notification/${userId}`;
    };
    const handleLogout = () => {
        window.location.href = '/';
        localStorage.clear();
      };

    const handleMouseEnter = (event) => {
        event.target.style.backgroundColor = '#DDDDDD';
    };
    
    const handleMouseLeave = (event) => {
        event.target.style.backgroundColor = '#FFFFFF';
    };

    const handleButtonClick = (buttonName) => {
        setActivePage(buttonName); // Gửi buttonName lên cho Home
        setActiveButton(buttonName);
        
    };
    
    const handleSettingClick = () => {
        handleLogout(); // Gọi hàm handleLogout khi nhấp vào nút "Setting"
    };
    return (
        
        <div style={{ position: 'fixed', backgroundColor: '#FFFFFF', width: '23%', height: '100vh', padding: '10px', display: 'flex', flexDirection: 'column', backgroundImage: 'linear-gradient(to right, transparent, #EEEEEE, transparent)' }}>
            
            <div style={{}}>
            </div>
            <ButtonWithIcon 
                icon={activeButton === "Home" ? Blackhome : Whitehome} 
                text="Home"
                isActive={activeButton === "Home"}
                onClick={() => handleButtonClick("Home")} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave} 
            />
            <ButtonWithIcon
                icon={activeButton === "Notification" ? Blacknoti : Whitenoti}
                text="Notification"
                isActive={activeButton === "Notification"}
                onClick={handleNotificationClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <ButtonWithIcon
                icon={activeButton === "Message" ? Blackmessage : Whitemessage}
                text="Message"
                isActive={activeButton === "Message"}
                onClick={() => handleButtonClick("Message")}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            
            <ButtonWithIcon
                icon={activeButton === "Course" ? Blackcourse : Whitecourse}
                text="Course"
                isActive={activeButton === "Course"}
                onClick={() => handleButtonClick("Course")}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <ButtonWithIcon
                icon={activeButton === "Setting" ? Blacksetting : Whitesetting}
                text="Setting"
                isActive={activeButton === "Setting"}
                onClick={handleSettingClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <div style={{ marginTop: 'auto' }}>
                <ButtonWithIcon
                    icon={activeButton === "Log out" ? Blacklogout : Whitelogout}
                    text="Log out"
                    isActive={activeButton === "Log out"}
                    onClick={() => handleButtonClick("Log out")}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            </div>
            <div style={{ position: 'absolute', right: '0', top: '0', width: '1px', height: '100%', backgroundColor: '#EEEEEE' }}></div>
        </div>
    );
};
const ButtonWithIcon = ({ icon, text, onClick, onMouseEnter, onMouseLeave, isActive }) => (
    <button style={{...buttonStyle, fontWeight: isActive ? 'bold' : 'normal'}} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <img src={icon} alt={text} style={{ width: '22px', height: '22px', marginRight: '8px' }} />
        {text}
    </button>
);

const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height:"7%",
    padding: '8px 12px',
    margin: '4px 0',
    backgroundColor: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
};

export default TabBar;
