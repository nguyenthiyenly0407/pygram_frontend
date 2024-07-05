// src/components/A1.js
import React from 'react';
import { useHistory } from 'react-router-dom';
const A3 = () => {
    const history = useHistory();
    const handleSubjectClick = (subject) => {
        console.log(`${subject} button clicked`);
        
        if (subject === 'Toán') {
            history.push('/course/grade10/a3/toan');
        } else if (subject === 'Ngữ văn') {
            history.push('/course/grade10/a3/van');
        } else if (subject === 'Ngoại ngữ') {
            history.push('/course/grade10/a3/anh');
        } else if (subject === 'Khoa học tự nhiên') {
            history.push('/course/grade10/a3/khoahoctunhien');
        } else if (subject === 'Khoa học xã hội') {
            history.push('/course/grade10/a3/khoahocxahoi');
        }
    }

    return (
        <div style={containerStyle}>
            <h1>Khối 10 - A1</h1>
            <div style={buttonContainerStyle}>
                <button style={buttonStyle} onClick={() => handleSubjectClick('Toán')}>
                    Toán
                </button>
                <button style={buttonStyle} onClick={() => handleSubjectClick('Ngữ văn')}>
                    Ngữ văn
                </button>
                <button style={buttonStyle} onClick={() => handleSubjectClick('Ngoại ngữ')}>
                    Ngoại ngữ
                </button>
                <button style={buttonStyle} onClick={() => handleSubjectClick('Khoa học tự nhiên')}>
                    Khoa học tự nhiên
                </button>
                <button style={buttonStyle} onClick={() => handleSubjectClick('Khoa học xã hội')}>
                    Khoa học xã hội
                </button>
            </div>
        </div>
    );
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
};

const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const buttonStyle = {
    width: '200px',
    height: '60px',
    margin: '10px',
    fontSize: '18px',
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

buttonStyle[':hover'] = {
    backgroundColor: '#0056b3',
};

export default A3;
