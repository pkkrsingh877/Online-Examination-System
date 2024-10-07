import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const QuizCreate = () => {
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleQuizSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(user)
            const userId = user.id;
            const response = await axios.post('http://localhost:5000/api/admin/quiz', { title, instructions, userId });
            console.log('Quiz created:', response.data);
            // Redirect or show success message
            navigate('/admin');
        } catch (error) {
            console.error('Error creating Quiz:', error);
        }
    };

    return (
        <Form onSubmit={handleQuizSubmit}>
            <h2>Create Quiz</h2>
            <Form.Group controlId="formQuizTitle">
                <Form.Label>Quiz Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Quiz Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formQuizInstructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write Quiz Instructions here..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default QuizCreate;
