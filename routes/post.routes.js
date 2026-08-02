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
// @desc    Tüm postları getir
// @access  Public
router.get('/', postController.getAllPosts);

// @route   GET api/posts/my-posts
// @desc    Giriş yapmış kullanıcının postlarını getir
// @access  Private
router.get('/my-posts', authMiddleware, postController.getMyPosts);

// @route   GET api/posts/:id
// @desc    ID ile tek bir post getir
// @access  Public
router.get('/:id', postController.getPostById);

// @route   PUT api/posts/:id
// @desc    Bir postu güncelle
// @access  Private
router.put('/:id', authMiddleware, postController.updatePost);

// @route   DELETE api/posts/:id
// @desc    Bir postu sil
// @access  Private
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
