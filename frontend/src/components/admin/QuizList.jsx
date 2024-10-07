import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import UserContext from "../../context/UserContext";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const { user } = useContext(UserContext);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/quiz?creatorId=${user.id}`);
            setQuizzes(response.data);
        } catch (error) {
            console.error("Error fetching quizzes", error);
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchQuizzes();
        }
    }, [user]);

    const deleteQuiz = async (quizId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/quiz/${quizId}`);
            setQuizzes((prevQuizzes) => prevQuizzes.filter(quiz => quiz._id !== quizId));
        } catch (error) {
            console.error("Error deleting quiz", error);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Your Quizzes</h2>
            {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <div key={quiz._id} className="p-3 my-3 border rounded">
                        <Row>
                            <Col>
                                <h4>{quiz.title}</h4>
                                <p>Created at: {new Date(quiz.createdAt).toLocaleString()}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Button as={Link} to={`/update-quiz/${quiz._id}`} variant="primary" className="w-100">
                                    Update Quiz
                                </Button>
                            </Col>
                            <Col md={4}>
                                <Button as={Link} to={`/update-questions/${quiz._id}`} variant="warning" className="w-100">
                                    Update Questions
                                </Button>
                            </Col>
                            <Col md={4}>
                                <Button onClick={() => deleteQuiz(quiz._id)} variant="danger" className="w-100">
                                    Delete Quiz
                                </Button>
                            </Col>
                        </Row>
                    </div>
                ))
            ) : (
                <p>No quizzes available to view!</p>
            )}
        </Container>
    );
};

export default QuizList;
