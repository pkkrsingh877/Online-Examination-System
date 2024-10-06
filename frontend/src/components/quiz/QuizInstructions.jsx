import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const QuizInstructions = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '30rem' }} className="text-center p-3">
                <Card.Body>
                    <Card.Title as="h2">Quiz Title</Card.Title>
                    <Card.Text>
                        <p>
                            Please read the instructions carefully before starting the quiz:
                        </p>
                        <ul className="text-left">
                            <li>Each question has a time limit of 1 minute.</li>
                            <li>You cannot go back to previous questions.</li>
                            <li>You can skip questions and come back later.</li>
                            <li>Once submitted, you cannot retake the quiz.</li>
                        </ul>
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
