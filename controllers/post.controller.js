const { validationResult } = require('express-validator');
const Post = require('../models/post.model');
const User = require('../models/User.model');

// @route   POST api/posts
// @desc    Yeni bir post oluştur
// @access  Private
const createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Middleware'den gelen kullanıcı ID'si ile kullanıcıyı bul
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            authorId: req.user.id // Middleware'den gelen kullanıcı ID'si
        });

        const post = await newPost.save();

        res.status(201).json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
};

module.exports = {
    createPost
};