import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PreviewQuiz = () => {
  const { id } = useParams(); // Get quiz ID from URL parameters
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]); // State to hold questions
  const [loading, setLoading] = useState(true); // State for loading status
  const navigate = useNavigate();

  const deleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/quiz/${quizId}`);
      navigate('/admin/quiz');
    } catch (error) {
      console.error("Error deleting quiz", error);
    }
  };

  const fetchQuizData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/quiz/${id}`);
      const responseQuestions = await axios.get(`http://localhost:5000/api/admin/quiz/${id}/question`);
      setQuiz(response.data);
      console.log(responseQuestions.data)
      setQuestions(responseQuestions.data); // Assuming your quiz data includes questions
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log('Error fetching quiz data', error);
      setLoading(false); // Set loading to false on error
    }
  };

  // Fetch quiz data by ID
  useEffect(() => {
    fetchQuizData();
  }, [id]);

  return (
    <Card className="mb-3">
      {quiz ? (<Card.Body>
        <Card.Title>{quiz.title}</Card.Title>
        <Card.Text>
          <strong>Instructions:</strong> {quiz.instructions}
        </Card.Text>
        <Card.Text>
          <strong>Join Code:</strong> {quiz.joinCode}
        </Card.Text>
        <Card.Text>
          <small>Created on: {new Date(quiz.createdAt).toLocaleString()}</small>
        </Card.Text>
        <Button as={Link} to={`/admin/quiz/${quiz._id}/update`} variant="primary">
          Update Quiz
        </Button>
        <Button onClick={() => deleteQuiz(quiz._id)} variant="danger">
          Delete Quiz
        </Button>
        <hr />
        <h1 className="display-4">Questions</h1>
        {questions && questions.length > 0 ? (
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                <strong>{index + 1}. </strong>{question.questionStatement} {/* Adjust based on your API structure */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions available for this quiz.</p>
        )}

      </Card.Body>) :
        (
          <p>Quiz Could Not be found!</p>
        )
      }
    </Card>
  );
};

export default PreviewQuiz;
