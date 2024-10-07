import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the quizId
import { Form, Button } from 'react-bootstrap'; // Import React Bootstrap components

const QuizUpdate = () => {
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchQuizData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/quiz/${id}`);
            const quizData = response.data;
            setTitle(quizData.title);
            setInstructions(quizData.instructions);
        } catch (error) {
        }
    };

    // Fetch quiz data when the component mounts
    useEffect(() => {
        fetchQuizData();
    }, [id]);

    // Handle form submission
    const handleQuizUpdate = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axios.patch(`http://localhost:5000/api/admin/quiz/${id}`, {
                title,
                instructions
            });

            navigate(`/admin/quiz/${id}`);
        } catch (error) {
            console.error('Error updating quiz:', error);
        }
    };

    return (
        <div>
            <h2>Update Quiz</h2>
            <Form onSubmit={handleQuizUpdate}>
                <Form.Group controlId="formQuizTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter quiz title"
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
                    Update Quiz
                </Button>
            </Form>
        </div>
    );
};

export default QuizUpdate;
