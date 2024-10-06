import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const QuizResult = ({ obtainedMarks, totalMarks }) => {
    const navigate = useNavigate();

    // Calculate percentage
    const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);

    return (
        <div className="container mt-5 text-center">
            <h1>Quiz Result</h1>
            <h2>
                {obtainedMarks} / {totalMarks}
            </h2>
            <h3>Percentage: {percentage}%</h3>
            <Button variant="primary" onClick={() => navigate('/')}>
                Exit
            </Button>
        </div>
    );
};

export default QuizResult;
