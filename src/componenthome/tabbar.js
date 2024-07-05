import React, { useState, useEffect } from 'react';
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
import Webfont from 'webfontloader';
import { useHistory } from 'react-router-dom';

const TabBar = ({ setActivePage }) => {
    const [activeButton, setActiveButton] = useState("Home");
    const [showCourses, setShowCourses] = useState(false);
    const [activeCourse, setActiveCourse] = useState(null);
    const history = useHistory();

    useEffect(() => {
        Webfont.load({
            google: {
                families: ['Dancing Script', 'Roboto']
            }
        });
    }, []);

    const handleNotificationClick = () => {
        const userId = localStorage.getItem('userIdhaha');
        window.location.href = `/notification/${userId}`;
    };

    const handleMessageClick = () => {
        window.location.href = `/message`;
    };

    const handleCourseClick = () => {
        setShowCourses(!showCourses);
        setActiveCourse(null);
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
        setActivePage(buttonName);
        setActiveButton(buttonName);
    };

    const handleSettingClick = () => {
        handleLogout();
    };

    const handleCourseBlockClick = (block) => {
        setActiveCourse(block === activeCourse ? null : block);
    };

    const handleCourseNavigationgrade10 = (course) => {
        history.push(`/course/grade10/${course.toLowerCase()}`);
    };
    const handleCourseNavigationgrade11 = (course) => {
        history.push(`/course/grade11/${course.toLowerCase()}`);
    };
    const handleCourseNavigationgrade12 = (course) => {
        history.push(`/course/grade12/${course.toLowerCase()}`);
    };

    return (
        <div style={{ position: 'fixed', backgroundColor: '#FFFFFF', width: '23%', height: '100vh', padding: '10px', display: 'flex', flexDirection: 'column', backgroundImage: 'linear-gradient(to right, transparent, #EEEEEE, transparent)' }}>
            <div style={{}}></div>
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
                onClick={handleMessageClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <ButtonWithIcon
                icon={activeButton === "Course" ? Blackcourse : Whitecourse}
                text="Course"
                isActive={activeButton === "Course"}
                onClick={handleCourseClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {showCourses && (
                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '20px' }}>
                    <CourseBlock
                        title="Khối 10"
                        activeCourse={activeCourse}
                        onClick={() => handleCourseBlockClick("Khối 10")}
                        handleCourseNavigation={handleCourseNavigationgrade10}
                    />
                    <CourseBlock
                        title="Khối 11"
                        activeCourse={activeCourse}
                        onClick={() => handleCourseBlockClick("Khối 11")}
                        handleCourseNavigation={handleCourseNavigationgrade11}
                    />
                    <CourseBlock
                        title="Khối 12"
                        activeCourse={activeCourse}
                        onClick={() => handleCourseBlockClick("Khối 12")}
                        handleCourseNavigation={handleCourseNavigationgrade12}
                    />
                </div>
            )}
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

const CourseBlock = ({ title, activeCourse, onClick, handleCourseNavigation }) => (
    <div style={{ marginBottom: '10px' }}>
        <button onClick={onClick} style={{ ...courseBlockStyle, fontWeight: activeCourse === title ? 'bold' : 'normal' }}>
            {title}
        </button>
        {activeCourse === title && (
            <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '20px', marginTop: '10px' }}>
                {['A1', 'A2', 'A3'].map(course => (
                    <button key={course} style={courseButtonStyle} onClick={() => handleCourseNavigation(course)}>
                        {course}
                    </button>
                ))}
            </div>
        )}
    </div>
);

const ButtonWithIcon = ({ icon, text, onClick, onMouseEnter, onMouseLeave, isActive }) => (
    <button style={{ ...buttonStyle, fontWeight: isActive ? 'bold' : 'normal' }} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <img src={icon} alt={text} style={{ width: '22px', height: '22px', marginRight: '8px' }} />
        {text}
    </button>
);

const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: "7%",
    padding: '8px 12px',
    margin: '4px 0',
    backgroundColor: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
};

const courseBlockStyle = {
    padding: '8px 12px',
    backgroundColor: '#F0F0F0',
    border: '1px solid #CCCCCC',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    marginBottom: '5px',
};

const courseButtonStyle = {
    padding: '8px 12px',
    backgroundColor: '#F0F0F0',
    border: '1px solid #CCCCCC',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '5px',
};

export default TabBar;
