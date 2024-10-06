import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts ? (
                    posts.map((post) => (
                        <div key={post._id}>
                            <h4><Link to={`/posts/${post._id}`}>{post.title}</Link></h4>
                            <p>{post.content}</p>
                            <p>Created at {new Date(post.createdAt).toLocaleString()}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No Posts Available to view!</p>
                )}
            </ul>
        </div>
    );
};

export default PostList;
