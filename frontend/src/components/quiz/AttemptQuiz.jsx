import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const AttemptQuiz = () => {
    const [timeLeft, setTimeLeft] = useState(3600); // Timer set to 1 hour (3600 seconds)
    const [answers, setAnswers] = useState({});

    // Sample questions data
    const quizName = "Sample Quiz";
    const questions = [
        { id: 1, question: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
        { id: 2, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"] },
        { id: 3, question: "What is the square root of 16?", options: ["2", "3", "4", "5"] },
        // Add more questions as needed
    ];

    // Timer function
    useEffect(() => {
        if (timeLeft <= 0) {
            // Timer expired logic here (e.g., auto-submit)
            alert("Time's up!");
            handleSubmit();
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Handle answer selection
    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: answer }));
    };

    // Handle form submission
    const handleSubmit = () => {
        // Submit the answers here
        console.log("Submitted answers:", answers);
        alert("Quiz Submitted!");
    };

    return (
        <div className="container mt-5">
            <h1>{quizName}</h1>
            <p>Time Remaining: {formatTime()}</p>

            <Form>
                {questions.map(question => (
                    <div key={question.id} className="mb-4">
                        <h5>{question.question}</h5>
                        {question.options.map((option, index) => (
                            <Form.Check
                                type="radio"
                                label={option}
                                name={`question-${question.id}`}
                                key={index}
                                onChange={() => handleAnswerChange(question.id, option)}
                            />
                        ))}
                    </div>
                ))}

                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>
    );
};

export default AttemptQuiz;
