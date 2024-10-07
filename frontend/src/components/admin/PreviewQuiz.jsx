import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PreviewQuiz = () => {
  const { id } = useParams(); // Get quiz ID from URL parameters
  const [quiz, setQuiz] = useState(null);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/quiz/${id}`);
      setQuiz(response.data);
    } catch (error) {
      console.log('Error fetching quiz data', error);
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
        <Button variant="primary" onClick={() => console.log('Edit Quiz')}>
          Edit Quiz
        </Button>
        <Button variant="danger" className="ml-2" onClick={() => console.log('Delete Quiz')}>
          Delete Quiz
        </Button>
      </Card.Body>) :
        (
          <p>Quiz Could Not be found!</p>
        )
      }
    </Card>
  );
};

export default PreviewQuiz;
