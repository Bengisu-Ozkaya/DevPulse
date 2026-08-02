// src/pages/PostDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetchPost = async () => {
      try {
        const response = await getPostById(id);
        const fetchedPost = response.data;
        setPost(fetchedPost);

        // Giriş yapmış kullanıcının yazar olup olmadığını kontrol et
        const token = localStorage.getItem('token');
        if (token && fetchedPost.authorId) {
          const decodedToken = jwtDecode(token);
          // Populated authorId bir obje olduğu için `._id` ile erişiyoruz
          if (decodedToken.user.id === fetchedPost.authorId._id) {
            setIsAuthor(true);
          }
        }
      } catch (err) {
        console.error("Yazı detayı yüklenirken hata:", err);
        setError('Yazı yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Bu yazıyı kalıcı olarak silmek istediğinizden emin misiniz?')) {
      try {
        await deletePost(id);
        navigate('/my-posts'); // Silme sonrası "Yazılarım" sayfasına yönlendir
      } catch (err) {
        console.error('Yazı silinirken hata oluştu:', err);
        setError('Yazı silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

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
      <div className="max-w-4xl mx-auto bg-card-bg/80 rounded-lg shadow-lg p-6 sm:p-8">
        <div className="flex justify-between items-start mb-6">
          <Link to="/" className="text-accent hover:underline">&larr; Geri Dön</Link>
          {isAuthor && (
            <div className="flex items-center gap-3">
              <Link
                to={`/edit-post/${post._id}`}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-bold text-white bg-heading rounded-lg hover:bg-heading-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card-bg focus:ring-heading transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                Düzenle
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card-bg focus:ring-red-500 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                Sil
              </button>
            </div>
          )}
        </div>
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-heading mb-2">{post.title || 'Başlık Yok'}</h1>
          <div className="flex items-center text-sm text-meta-text">
            <span>{post.authorId?.name || 'Bilinmeyen Yazar'}</span>
            <span className="mx-2">&bull;</span>
            <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
        <div className="prose lg:prose-xl max-w-none text-heading/90 prose-headings:text-heading whitespace-pre-wrap break-words">
          <p>{post.content || 'İçerik bulunamadı.'}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
