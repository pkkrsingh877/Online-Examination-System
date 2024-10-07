import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the quizId
import { Form, Button } from 'react-bootstrap'; // Import React Bootstrap components

const QuestionCreate = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']); // Example for multiple-choice questions
    const [correctOption, setCorrectOption] = useState('');
    const { quizId } = useParams();
    const navigate = useNavigate();

    const handleAddQuestion = async () => {
        // Call API to add question
        try {
            await axios.post(`http://localhost:5000/api/admin/quiz/${quizId}/question`, {
                questionStatement: question,
                options,
                correctOption
            });
            // Clear state for the next question
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectOption('');
            console.log('Question added successfully!');
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    const handleAddOption = () => {
        // Add a new empty option field
        setOptions((prevOptions) => [...prevOptions, '']);
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleDone = () => {
        // Navigate to quiz preview component
        navigate(`/admin/quiz/${quizId}`); // Update this path based on your routing structure
    };

    return (
        <div>
            <h2>Add Question</h2>
            <Form onSubmit={(e) => { e.preventDefault(); handleAddQuestion(); }}>
                <Form.Group>
                    <Form.Label>Question</Form.Label>
                    <Form.Control type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
                </Form.Group>
                <Form.Label>Options</Form.Label>
                {options.map((option, index) => (
                    <Form.Group key={index}>
                        <Form.Control
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            required
                        />
                    </Form.Group>
                ))}
                <Button variant="secondary" onClick={handleAddOption}>
                    Add Option
                </Button>
                <Form.Group>
                    <Form.Label>Correct Option</Form.Label>
                    <Form.Control type="text" value={correctOption} onChange={(e) => setCorrectOption(e.target.value)} required placeholder="Enter correct option" />
                </Form.Group>
                <Button variant="primary" type="submit">Add Question</Button>
            </Form>
            <Button variant="success" onClick={handleDone}>
                Done
            </Button>
        </div>
    );
};

export default QuestionCreate;
