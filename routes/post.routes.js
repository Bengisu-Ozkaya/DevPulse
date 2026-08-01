const express = require('express');
const router = express.Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', (req, res) => {
    res.send('Create a post');
});

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
    res.send('Get all posts');
});

module.exports = router;
