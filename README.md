# DevPulse - Full-Stack Blog & İçerik Yönetim Platformu

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-323330?style=for-the-badge&logo=JSON%20Web%20Tokens&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

---

## 🚀 Proje Hakkında

**DevPulse**, Node.js (Express) ve React (Vite) ile geliştirilen modern bir full-stack blog ve içerik yönetim platformudur. JWT tabanlı güvenli kimlik doğrulama, dinamik içerik yönetimi, kapsamlı CRUD akışı ve responsive bir Tailwind CSS arayüzüne sahiptir.

---

## ✨ Öne Çıkan Özellikler

- JWT tabanlı güvenli kimlik doğrulama
- `bcryptjs` ile güvenli şifre hashleme
- Responsive, modern Tailwind CSS arayüz tasarımı
- Blog yazıları için tam CRUD işlemleri
- Korumalı “Yazı Ekle” ve “Yazılarım” bölümleri
- Başlığa ve kategoriye göre anlık arama & filtreleme
- Kullanıcı oturumu yönetimi ve token bazlı erişim
- API ile ön yüz ve arka yüz ayrımı

---

## 🧰 Teknoloji Yığını

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

### Araçlar & Deployment
- Git / GitHub
- Render (Backend)
- Vercel (Frontend)
- Postman / Thunder Client

---

## 📁 Klasör Yapısı

```
DevPulse/
├── blog-frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   └── post.controller.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── post.model.js
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   ├── post.routes.js
│   └── user.routes.js
├── package.json
└── .env.example
```

---

## 📌 API Endpoints

| Method | Endpoint | Açıklama | Auth |
|---|---|---|:---:|
| POST | `/api/auth/register` | Yeni kullanıcı kaydı | Hayır |
| POST | `/api/auth/login` | Kullanıcı girişi / JWT alımı | Hayır |
| GET | `/api/auth/profile` | Kullanıcı profili | Evet |
| GET | `/api/posts` | Tüm yazıları listele | Hayır |
| GET | `/api/posts/:id` | Yazı detayını getir | Hayır |
| GET | `/api/posts/my-posts` | Kullanıcının yazılarını listele | Evet |
| POST | `/api/posts` | Yeni yazı oluştur | Evet |
| PUT | `/api/posts/:id` | Yazıyı güncelle | Evet |
| DELETE | `/api/posts/:id` | Yazıyı sil | Evet |

---

## ⚙️ Kurulum & Çalıştırma

### 1. Depoyu klonlayın
```bash
git clone https://github.com/kullanici-adi/DevPulse.git
cd DevPulse
```

### 2. Backend kurulumu
```bash
npm install
```

### 3. Frontend kurulumu
```bash
cd blog-frontend
npm install
```

### 4. Ortam değişkenlerini ayarlayın
`DevPulse/.env` veya `DevPulse/blog-frontend/.env` içinde aşağıdaki değişkenleri yapılandırın:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 5. Geliştirme sunucularını başlatma

Backend:
```bash
npm start
```
veya
```bash
npm run dev
```

Frontend:
```bash
cd blog-frontend
npm run dev
```

---

## 🖼️ Ekran Görüntüleri / Demo Alanları

> Aşağıdaki alanlara proje ekran görüntülerini ekleyebilirsiniz.

### Ana Sayfa
<img width="958" height="403" alt="Image" src="https://github.com/user-attachments/assets/65f03a45-9b06-49a7-af38-fe5409ab8193" />

### Yazı Detayı  
![Yazı Detayı](<img width="928" height="405" alt="Image" src="https://github.com/user-attachments/assets/8ff54272-a84a-4c16-8ccc-742b2711a429" />)

### Yazı Düzenleme
![Yazı Düzenleme](<img width="635" height="410" alt="Image" src="https://github.com/user-attachments/assets/152543ae-8540-444b-8c8a-e54235ca2b9d" />)

### Kayıt / Giriş
![Auth Ekranı](<img width="959" height="412" alt="Image" src="https://github.com/user-attachments/assets/865213c1-490d-47be-ad53-c8e505983bbd" />)


---

## 🌐 Canlı Demo

- Frontend: `https://your-frontend-url.vercel.app`
- Backend: `https://your-backend-url.onrender.com`

> Canlı demo linklerini kendi yayınladığınız adreslerle güncelleyin.

---

## 🤝 İletişim

- GitHub: [github.com/kullanici-adi](https://github.com/Bengisu-Ozkaya)
- E-posta: `bngs050621@gmail.com`
- LinkedIn: `www.linkedin.com/in/bengisu-özkaya-b1a552372`

---

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakabilirsiniz.

---
