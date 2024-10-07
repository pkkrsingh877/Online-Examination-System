import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const JoinQuiz = () => {
    const [joinId, setJoinId] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleJoin = (e) => {
        e.preventDefault();
        // Navigate to QuizInstructions page with joinId
        navigate(`/quiz/instructions/${joinId}`);
    };

    return (
        <Form onSubmit={handleJoin} className="join-form">
            <h3 className="display-6">Join Quiz</h3>
            <Form.Group controlId="joinId" className="mb-3">
                <Form.Label>Join ID</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Join ID"
                    value={joinId}
                    onChange={(e) => setJoinId(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Join
            </Button>
        </Form>
    );
};

export default JoinQuiz;
