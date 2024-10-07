import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const QuestionsUpdate = () => {
    const { questionId } = useParams(); // Get the questionId from the URL
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState('');
    const navigate = useNavigate();

    // Fetch the existing question data when the component mounts
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/question/${questionId}`);
                const { questionStatement, options, correctOption } = response.data;

                setQuestion(questionStatement);
                setOptions(options);
                setCorrectOption(correctOption);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        fetchQuestion();
    }, [questionId]);

    const handleUpdateQuestion = async () => {
        // Call API to update question
        try {
            await axios.put(`http://localhost:5000/api/admin/question/${questionId}`, {
                questionStatement: question,
                options,
                correctOption,
            });
            console.log('Question updated successfully!');
            navigate(`/admin/quiz/${questionId}`); // Navigate back after updating
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    return (
        <div>
            <h2>Update Question</h2>
            <Form onSubmit={(e) => { e.preventDefault(); handleUpdateQuestion(); }}>
                <Form.Group>
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
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
                <Form.Group>
                    <Form.Label>Correct Option</Form.Label>
                    <Form.Control
                        type="text"
                        value={correctOption}
                        onChange={(e) => setCorrectOption(e.target.value)}
                        required
                        placeholder="Enter correct option"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Update Question</Button>
            </Form>
            <Button variant="secondary" onClick={() => navigate(-1)}>
                Go Back
            </Button>
        </div>
    );
};

export default QuestionsUpdate;
