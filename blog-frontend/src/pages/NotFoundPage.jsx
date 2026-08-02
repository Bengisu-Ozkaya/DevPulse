// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mb-4">Sayfa bulunamadı.</p>
      <Link to="/" className="text-blue-500 hover:underline">Anasayfaya dön</Link>
    </div>
  );
};

export default NotFoundPage;
