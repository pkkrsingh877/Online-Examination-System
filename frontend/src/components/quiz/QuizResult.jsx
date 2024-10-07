import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const QuizResult = () => {
    const { state } = useLocation(); // Access the state passed from the previous component
    const { correct, total } = state || { correct: 0, total: 0 };
    const navigate = useNavigate();

    // Calculate percentage
    const percentage = ((correct / total) * 100).toFixed(2);

    return (
        <div className="container mt-5 text-center">
            <h1>Quiz Result</h1>
            <h2>
                {correct} / {total}
            </h2>
            <h3>Percentage: {percentage}%</h3>
            <Button variant="primary" onClick={() => navigate('/')}>
                Exit
            </Button>
        </div>
    );
};

export default QuizResult;
