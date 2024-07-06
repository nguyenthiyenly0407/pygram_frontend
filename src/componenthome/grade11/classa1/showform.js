import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShowForm = () => {
    const { link } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/quizzes/${link}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        fetchQuiz();
    }, [link]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
            setUserId(user.id);
        }
    }, []);

    const handleOptionChange = (questionId, optionText) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: optionText,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/submitquiz', {
                userId,
                quizId: quiz.id,
                answers: selectedAnswers,
            });
            const { score, totalQuestions } = response.data;
            setScore(`${score} / ${totalQuestions}`);
            
            const updatedQuestions = quiz.questions.map(question => ({
                ...question,
                isCorrect: selectedAnswers[question.id] === question.correct_answer,
            }));

            setQuiz({
                ...quiz,
                questions: updatedQuestions,
            });
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{quiz.title}</h1>
            {quiz.questions.map((question, index) => (
                <div key={index}>
                    <h3>{question.question}</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {question.options.map((option, optIndex) => (
                            <li key={optIndex} style={{ marginBottom: '8px' }}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={option.option_text}
                                        checked={selectedAnswers[question.id] === option.option_text}
                                        onChange={() => handleOptionChange(question.id, option.option_text)}
                                    />
                                    {option.option_text}
                                </label>
                                {question.isCorrect !== undefined && selectedAnswers[question.id] === option.option_text && (
                                    question.isCorrect ? (
                                        <span style={{ color: 'green' }}>❌</span>
                                    ) : (
                                        <span style={{ color: 'red' }}>✔️</span>
                                    )
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
            {score && <div>Your score: {score}</div>}
        </div>
    );
};

export default ShowForm;
