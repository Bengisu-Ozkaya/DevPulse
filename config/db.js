// .env dosyanıza MONGO_URI="your_mongodb_connection_string" ekleyin
// Örnek: MONGO_URI="mongodb://localhost:27017/blogDB"
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB bağlantısı başarılı.');
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error.message);
        // Hata durumunda uygulamayı sonlandır
        process.exit(1);
    }
};

module.exports = connectDB;
