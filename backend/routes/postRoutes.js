const express = require('express');
const { createPost, getPosts, getPost } = require('../controllers/postController');

const router = express.Router();

// Route for creating a new post
router.post('/posts', createPost);

// Route for getting all posts
router.get('/posts', getPosts);

// Route for getting single post
router.get('/posts/:id', getPost);

module.exports = router;
