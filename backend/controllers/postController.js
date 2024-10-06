const Post = require('../models/Post');

// Controller to create a new post
const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const newPost = new Post({ title, content, userId });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get one post
const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPost, getPosts, getPost };
