import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(user)
            const userId = user.id;
            const response = await axios.post('http://localhost:5000/api/posts', { title, content, userId });
            console.log('Post created:', response.data);
            // Redirect or show success message
            navigate('/posts');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form onSubmit={handlePostSubmit}>
            <h2>Create Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Write your post here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit">Post</button>
        </form>
    );
};

export default CreatePost;
