const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// @route   POST api/auth/register
// @desc    Kullanıcı kaydı
// @access  Public
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Kullanıcının zaten var olup olmadığını kontrol et
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'Bu e-posta ile bir kullanıcı zaten mevcut' }] });
        }

        user = new User({
            name,
            email,
            password
        });

        // Şifreyi hash'le
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // JSON Web Token oluştur ve döndür
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5 days' }, // Token'ın geçerlilik süresi
            (err, token) => {
                if (err) {
                    console.error('JWT imzalama hatası:', err);
                    return res.status(500).send('Token oluşturulurken bir hata oluştu.');
                }
                res.status(201).json({ token }); // 200 OK yerine 201 Created daha uygun
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu hatası');
    }
};

// @route   POST api/auth/login
// @desc    Kullanıcı girişi ve token alma
// @access  Public
const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Kullanıcıyı bul
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Geçersiz kimlik bilgileri' }] });
        }

        // Şifreleri karşılaştır
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Geçersiz kimlik bilgileri' }] });
        }

        // JSON Web Token oluştur ve döndür
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
            if (err) {
                console.error('JWT imzalama hatası:', err);
                return res.status(500).send('Token oluşturulurken bir hata oluştu.');
            }
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sunucu hatası');
    }
};

module.exports = {
    registerUser,
    loginUser
};