import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const JoinQuiz = () => {
    const [joinId, setJoinId] = useState('');

    const handleJoin = (e) => {
        e.preventDefault();
        // Add logic for handling the join action here
        console.log('Join ID:', joinId);
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
