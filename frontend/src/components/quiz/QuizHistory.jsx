import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const QuizHistory = () => {
    const [quizResults, setQuizResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuizResults = async () => {
            try {
                const response = await axios.get('/api/quiz-results'); // Adjust the API endpoint as needed
                const results = response.data;

                // Sort results and take the latest 5
                const latestResults = results.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
                setQuizResults(latestResults);
            } catch (err) {
                setError('Error fetching quiz results.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizResults();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5">
            <h2>Quiz History</h2>
            {quizResults.length === 0 ? (
                <p>No quiz results found.</p>
            ) : (
                <ListGroup>
                    {quizResults.map((result, index) => (
                        <ListGroup.Item key={index}>
                            <h5>{result.quizTitle}</h5>
                            <p>Obtained Marks: {result.obtainedMarks} / {result.totalMarks}</p>
                            <p>Date: {new Date(result.date).toLocaleDateString()}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default QuizHistory;
