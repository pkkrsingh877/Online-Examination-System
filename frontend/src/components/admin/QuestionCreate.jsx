import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the quizId
import { Form, Button } from 'react-bootstrap'; // Import React Bootstrap components

const QuestionCreate = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']); // Example for multiple-choice questions
    const [correctOption, setcorrectOption] = useState('');
    const { quizId } = useParams();

    const handleAddQuestion = async () => {
        // Call API to add question
        try {
            await axios.post(`http://localhost:5000/api/admin/quiz/${quizId}/question`, {
                questionStatement: question,
                options,
                correctOption,
            });
            // Clear state for the next question
            setQuestion('');
            setOptions(['', '', '', '']);
            setcorrectOption('');
            alert('Question added successfully!');
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };
    return (
        <div>
            <h2>Add Question</h2>
            <Form onSubmit={(e) => { e.preventDefault(); handleAddQuestion(); }}>
                <Form.Group>
                    <Form.Label>Question</Form.Label>
                    <Form.Control type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
                </Form.Group>
                {/* Additional fields for options and correct answer */}
                {/* ... */}
                <Button variant="primary" type="submit">Add Question</Button>
                <Button variant="secondary" onClick={() => {/* Navigate to another page or clear state */ }}>Continue</Button>
            </Form>
        </div>
    );
}

export default QuestionCreate;
