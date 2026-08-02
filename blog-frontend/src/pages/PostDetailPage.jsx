// src/pages/PostDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../services/api';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError('Yazı yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Yükleniyor...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (!post) {
    return <p className="text-center py-10">Yazı bulunamadı.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <Link to="/" className="text-indigo-600 hover:underline mb-4 block">&larr; Geri Dön</Link>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{post.title || 'Başlık Yok'}</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>{post.author?.username || 'Bilinmeyen Yazar'}</span>
            <span className="mx-2">&bull;</span>
            <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
        <div className="prose lg:prose-xl max-w-none text-gray-800 whitespace-normal break-words">
          <p>{post.content || 'İçerik bulunamadı.'}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
