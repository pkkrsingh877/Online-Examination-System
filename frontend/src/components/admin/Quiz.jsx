import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Post = () => {
  const { id } = useParams();  // Get the post id from the URL
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(response.data);
    } catch (err) {
      console.log(err)
    }
  };

  // Fetch the post data when the component mounts
  useEffect(() => {
    fetchPost();
  }, [id]);

  return (
    <div>
      {post ? (
        <div className={styles.post}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <p className={styles.postContent}>{post.content}</p>
          <p className={styles.postDate}>Date: {new Date(post.createdAt).toLocaleString()}</p>
          <Link to="/posts">All Posts</Link>
        </div>
      ) : (
        <p>No user information available</p>
      )}
    </div>
  );
};

export default Post;
