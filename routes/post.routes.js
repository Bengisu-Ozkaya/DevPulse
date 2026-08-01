const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const postController = require('../controllers/post.controller');

// @route   POST api/posts
// @desc    Yeni bir post oluştur
// @access  Private
router.post(
    '/',
    [
        authMiddleware, // Rota artık korumalı!
        check('title', 'Başlık alanı zorunludur').not().isEmpty(),
        check('content', 'İçerik alanı zorunludur').not().isEmpty()
    ],
    postController.createPost
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
    res.send('Get all posts');
});

module.exports = router;
