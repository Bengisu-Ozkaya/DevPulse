const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Veritabanına bağlan
connectDB();

// Body Parser Middleware'i
app.use(express.json({ extended: false }));

// Ana Rota
app.get('/', (req, res) => res.send('Blog API Çalışıyor'));

// Rotaları Tanımla
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/posts', require('./routes/post.routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda başlatıldı`));
