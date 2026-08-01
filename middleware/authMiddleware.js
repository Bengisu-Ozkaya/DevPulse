const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Header'dan token'ı al
    const authHeader = req.header('Authorization');

    // Token yoksa kontrol et
    if (!authHeader) {
        return res.status(401).json({ msg: 'Token bulunamadı, yetkilendirme reddedildi' });
    }

    try {
        // Token "Bearer <token>" formatında olduğu için ayırıyoruz
        const token = authHeader.split(' ')[1];

        // Token geçerli değilse
        if (!token) {
            return res.status(401).json({ msg: 'Token formatı geçersiz, yetkilendirme reddedildi' });
        }

        // Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Payload'dan gelen kullanıcıyı request'e ekle
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token geçerli değil' });
    }
};