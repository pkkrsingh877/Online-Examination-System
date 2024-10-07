import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import axios from 'axios';

const AttemptQuiz = () => {
    const [answers, setAnswers] = useState([]); // User answers stored here
    const [questions, setQuestions] = useState([]); // State to hold fetched questions
    const [quizName, setQuizName] = useState(''); // State to hold quiz name
    const { user } = useContext(UserContext);
    const { quizId } = useParams();
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/quiz/${quizId}/question`);
            setQuestions(response.data.questions);
            setQuizName(response.data.quizName);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    // Handle answer selection and update answers array
    const handleAnswerChange = (questionId, selectedAnswer) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = prevAnswers.filter(answer => answer.questionId !== questionId);
            updatedAnswers.push({ questionId, selectedAnswer });
            return updatedAnswers;
        });
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/quiz/result', { answers, quizId, userId: user.id });
            const data = response.data;
            if (response.status === 200) {
                // Navigate to QuizResult and pass the data
                navigate('/quiz/result', { state: { correct: data.correct, total: data.total } });
                // Process response if needed, e.g., show score
            } else {
                throw new Error('Failed to submit results');
            }
        } catch (error) {
            console.error('Error submitting results:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>{quizName}</h1>

            <Form>
                {questions.map(({ _id, questionStatement, options }) => (
                    <div key={_id} className="mb-4">
                        <h5>Q. {questionStatement}</h5>
                        {options.map((option, index) => (
                            <Form.Check
                                type="radio"
                                label={option}
                                name={`question-${_id}`}
                                key={`question-${_id}-${index}`}
                                value={option}
                                checked={answers.find(answer => answer.questionId === _id)?.selectedAnswer === option}
                                onChange={() => handleAnswerChange(_id, option)}
                            />
                        ))}
                    </div>
                ))}

                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>
    );
};

export default AttemptQuiz;
