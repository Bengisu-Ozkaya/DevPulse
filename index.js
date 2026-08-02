const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Veritabanına bağlan
connectDB();

// Body Parser Middleware'i
app.use(express.json({ extended: false }));

// CORS Middleware'i
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Ana Rota
app.get('/', (req, res) => res.send('Blog API Çalışıyor'));

// Rotaları Tanımla
// app.use('/api/users', require('./routes/user.routes')); // Henüz oluşturulmadığı için geçici olarak kapatıldı
app.use('/api/posts', require('./routes/post.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda başlatıldı`));

process.on('unhandledRejection', (reason, promise) => {
  console.error('Yakalanmayan Promise Reddi:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Yakalanmayan Hata:', err);
});