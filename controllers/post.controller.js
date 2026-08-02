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

// @route   GET api/posts
// @desc    Tüm postları getir
// @access  Public
const getAllPosts = async (req, res) => {
    try {
        // Postları en yeniden eskiye doğru sırala ve yazar bilgilerini ekle
        const posts = await Post.find().populate('authorId', ['name']).sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
};

// @route   GET api/posts/:id
// @desc    ID ile tek bir post getir
// @access  Public
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('authorId', ['name']);

        if (!post) {
            return res.status(404).json({ msg: 'Post bulunamadı' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        // Eğer gönderilen ID formatı geçersizse 404 hatası dön
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post bulunamadı' });
        }
        res.status(500).send('Sunucu Hatası');
    }
};

// @route   PUT api/posts/:id
// @desc    Bir postu güncelle
// @access  Private
const updatePost = async (req, res) => {
    const { title, content, category } = req.body;

    // Güncellenecek alanlardan bir obje oluştur
    const postFields = {};
    if (title) postFields.title = title;
    if (content) postFields.content = content;
    if (category) postFields.category = category;

    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post bulunamadı' });
        }

        // Postun yazarının, istek atan kullanıcı olup olmadığını kontrol et
        if (post.authorId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Yetkiniz yok' });
        }

        post = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: postFields },
            { new: true } // Güncellenmiş veriyi geri döndür
        );

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
};

// @route   DELETE api/posts/:id
// @desc    Bir postu sil
// @access  Private
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post bulunamadı' });
        }

        // Postun yazarının, istek atan kullanıcı olup olmadığını kontrol et
        if (post.authorId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Yetkiniz yok' });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Post başarıyla silindi' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
};

// @route   GET api/posts/my-posts
// @desc    Giriş yapmış kullanıcının tüm postlarını getir
// @access  Private
const getMyPosts = async (req, res) => {
    try {
        // Postları authorId'ye göre bul, en yeniden eskiye sırala ve yazar bilgilerini ekle
        const posts = await Post.find({ authorId: req.user.id }).populate('authorId', ['name']).sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getMyPosts
};