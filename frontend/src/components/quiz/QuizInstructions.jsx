import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const QuizInstructions = () => {
    const { joinCode } = useParams(); // Changed to match your original JoinQuiz component
    const [quizData, setQuizData] = useState(null); // State to hold quiz data

    const fetchQuizData = async () => {
        try {
            const response = await fetch(`/quiz/${joinCode}`); // Replace with your actual API endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch quiz data');
            }
            const data = await response.json();
            setQuizData(data); // Assuming data contains the quiz title and instructions
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchQuizData();
    }, [joinCode]); // Re-run effect if joinCode changes

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '30rem' }} className="text-center p-3">
                <Card.Body>
                    <Card.Title as="h2">{quizData.title}</Card.Title> {/* Display quiz title */}
                    <Card.Text>
                        <p>{quizData.instructions}</p> {/* Display quiz instructions */}
                    </Card.Text>
                    <Button variant="primary" size="lg">
                        Start Quiz
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default QuizInstructions;
