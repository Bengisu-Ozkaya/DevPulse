const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User.model');

// @route   POST api/auth/register
// @desc    Kullanıcı kaydı
// @access  Public
router.post(
    '/register',
    [
        // express-validator ile girdi kontrolü
        check('name', 'İsim alanı zorunludur').not().isEmpty(),
        check('email', 'Lütfen geçerli bir e-posta adresi girin').isEmail(),
        check('password', 'Lütfen 6 veya daha fazla karakter içeren bir şifre girin').isLength({ min: 6 })
    ],
    authController.registerUser
);

// @route   POST api/auth/login
// @desc    Kullanıcı girişi ve token alma
// @access  Public
router.post(
    '/login',
    [
        check('email', 'Lütfen geçerli bir e-posta adresi girin').isEmail(),
        check('password', 'Şifre alanı zorunludur').exists()
    ],
    authController.loginUser
);

// @route   GET api/auth
// @desc    Giriş yapmış kullanıcıyı getir
// @access  Private
// Bu, authMiddleware'in nasıl kullanılacağına dair bir örnektir.
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu Hatası');
    }
});

module.exports = router;