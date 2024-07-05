import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const Toan = () => {
    const [userId, setUserId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [showCreateQuestionForm, setShowCreateQuestionForm] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [quizLink, setQuizLink] = useState('');
    const [title, setTitle] = useState('');
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
            setUserId(user.id);
        }
        fetchFiles();
        fetchAllQuizzes();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded:', response.data);
            fetchFiles();
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const fetchFiles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/files');
            setUploadedFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const handleFileDelete = async (filename) => {
        try {
            const encodedFilename = encodeURIComponent(filename);
            await axios.delete(`http://localhost:5000/delete/${encodedFilename}`);
            fetchFiles();
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const handleFileDownload = async (filename) => {
        try {
            const encodedFilename = encodeURIComponent(filename);
            const response = await axios({
                url: `http://localhost:5000/download/${encodedFilename}`,
                method: 'GET',
                responseType: 'blob',
            });

            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleCreateQuestion = () => {
        setShowCreateQuestionForm(true);
    };
    const handlequestions= ()=>{
        const newQuestion = {
            title: title.trim(),
            question: questionText.trim(),
            options: options.filter(opt => opt.trim() !== ''),
            correctAnswer: correctAnswer.trim(),
        };
            setQuestionText('');
            setOptions(['']);
            setCorrectAnswer('');
            
        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);

    }
    const handleAddQuestion = async () => {
        const updatedQuestions = [...questions];
        setQuestions(updatedQuestions);

        try {
            const postResponse = await axios.post('http://localhost:5000/quizzes', {
                title: title.trim(),
                questions: updatedQuestions,
            });
            console.log('Quiz added:', postResponse.data);
            
            if (postResponse.data && postResponse.data.link) {
                // Lưu link xuống localStorage
                localStorage.setItem('quizLink', postResponse.data.link);
                // Lưu link xuống state để hiển thị trên giao diện người dùng
                setQuizLink(postResponse.data.link);
                
                // Lưu link xuống cơ sở dữ liệu (ví dụ: bạn cần gửi yêu cầu POST để lưu link xuống server)

                // Sau đó, fetch lại danh sách các bài quiz để cập nhật giao diện
                const getResponse = await axios.get('http://localhost:5000/quizzes');
                setQuizzes(getResponse.data);
                window.location.reload();
            } else {
                console.error('Invalid response from server:', postResponse.data);
            }
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    const fetchAllQuizzes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/quizzes');
            setQuizzes(response.data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    const handleQuestionTextChange = (e) => {
        setQuestionText(e.target.value);
    };

    const handleTitleTextChange = (e) => {
        setTitle(e.target.value);
    };

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...options];
        updatedOptions[index] = e.target.value;
        setOptions(updatedOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleCorrectAnswerChange = (e) => {
        setCorrectAnswer(e.target.value);
    };
    const handleDownloadScores = async (quizId) => {
        try {
          const response = await axios({
            url: `http://localhost:5000/downloadscores/${quizId}`,
            method: 'GET',
            responseType: 'blob', // Important to handle binary data
          });
      
          const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', 'scores.xlsx'); // The file name
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          console.error('Error downloading scores:', error);
        }
      };
    return (
        <div>
            <h1>Toán</h1>
            {userId.startsWith('215') && (
                <div>
                    <input type="file" onChange={handleFileChange} />
                    <div>
                        <h2>File Preview</h2>
                        {uploadedFiles.map((file, index) => (
                            <div key={index}>
                                <a href={file.url} target="_blank" rel="noopener noreferrer">{file.url}</a>
                                <button onClick={() => handleFileDelete(file.url.split('/').pop())}>Delete</button>
                                <button onClick={() => handleFileDownload(file.url.split('/').pop())}>Download</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleFileUpload}>Upload File</button>
                </div>
            )}
            {userId.startsWith('115') && (
                <div>
                    <input type="file" onChange={handleFileChange} />
                    <div>
                        <h2>File Preview</h2>
                        {uploadedFiles.map((file, index) => (
                            <div key={index}>
                                <a href={file.url} target="_blank" rel="noopener noreferrer">{file.url}</a>
                                <button onClick={() => handleFileDelete(file.url.split('/').pop())}>Delete</button>
                                <button onClick={() => handleFileDownload(file.url.split('/').pop())}>Download</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleFileUpload}>Upload File</button>
                    <button onClick={handleCreateQuestion}>Tạo Câu Hỏi</button>
                    <button onClick={handlequestions}>Add Question</button>
                    <button onClick={handleAddQuestion}>SUBMIT QUIZ</button>
                    {showCreateQuestionForm && (
                        <div style={{ marginTop: '20px' }}>
                            <h2>Create Multiple Choice Question</h2>
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleTextChange}
                                placeholder="Title"
                            />
                            <input
                                type="text"
                                value={questionText}
                                onChange={handleQuestionTextChange}
                                placeholder="Enter your question"
                            />
                            <br />
                            <h3>Options</h3>
                            {options.map((option, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(e, index)}
                                        placeholder={`Option ${index + 1}`}
                                    />
                                </div>
                            ))}
                            <button onClick={handleAddOption}>Add Option</button>
                            
                            <input
                                type="text"
                                value={correctAnswer}
                                onChange={handleCorrectAnswerChange}
                                placeholder="Correct answer"
                            />
                            <ul>
                                {questions && questions.map((question, index) => (
                                    <li key={index}>
                                        <strong>{question.title}</strong>
                                        <p>{question.question}</p>
                                        <ul>
                                            {question.options && question.options.map((option, optionIndex) => (
                                                <li key={optionIndex}>
                                                    <input
                                                        type="radio"
                                                        name={`correctAnswer-${index}`}
                                                        value={option}
                                                        checked={correctAnswer === option}
                                                        onChange={handleCorrectAnswerChange}
                                                    />
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

        <ul>
            {quizzes.map((quiz, index) => (
        <li key={index}>
          <Link to={`/course/grade10/a1/showform/${quiz.link}`} target="_blank" rel="noopener noreferrer">
            {quiz.title}
          </Link>
          {userId.startsWith('115') && (
            <button onClick={() => handleDownloadScores(quiz.id)}>Download file score</button>
          )}
        </li>
      ))}
    </ul>
        </div>
    );
};

export default Toan;
