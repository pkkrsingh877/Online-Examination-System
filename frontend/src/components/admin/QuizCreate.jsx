import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

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
            const response = await axios.post('http://localhost:5000/api/admin/quiz', { title, Instructions, userId });
            console.log('Quiz created:', response.data);
            // Redirect or show success message
            navigate('/admin');
        } catch (error) {
            console.error('Error creating Quiz:', error);
        }
    };

    return (
        <form onSubmit={handleQuizSubmit}>
            <h2>Create Quiz</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Write Quiz Instructions here..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default QuizCreate;
