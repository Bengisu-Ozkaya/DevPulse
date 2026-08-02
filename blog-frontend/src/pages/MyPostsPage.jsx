// src/pages/MyPostsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyPosts, deletePost } from '../services/api';

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await getMyPosts();
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Yazılarım yüklenirken hata:", err);
        setError('Yazılarınız yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm('Bu yazıyı kalıcı olarak silmek istediğinizden emin misiniz?')) {
      try {
        await deletePost(postId);
        // Yazıyı state'ten kaldırarak arayüzü anında güncelle
        setPosts(currentPosts => currentPosts.filter(post => post._id !== postId));
      } catch (err) {
        console.error('Yazı silinirken hata oluştu:', err);
        setError('Yazı silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.category && post.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-heading mb-2">Yazılarım</h1>
        <p className="text-meta-text">Yayınladığınız tüm yazılar.</p>
      </div>

      <div className="mb-8 relative max-w-lg mx-auto">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="h-5 w-5 text-meta-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
        </div>
        <input
          type="text"
          placeholder="Yazılarınızda arayın (başlık veya kategori)..."
          className="w-full px-4 py-2 pl-10 bg-app border border-card rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent text-heading placeholder-meta-text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
            <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-meta-text hover:text-heading"
                aria-label="Aramayı temizle"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </button>
        )}
      </div>

      {loading && <p className="text-center text-heading">Yükleniyor...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            filteredPosts.length > 0 ? (
              filteredPosts.map((post) => {
                const { _id, title, category, createdAt } = post;
                return (
                  <div key={_id} className="bg-app rounded-lg shadow-md overflow-hidden flex flex-col justify-between border border-card hover:shadow-xl hover:border-heading transition-all duration-300">
                    <Link to={`/post/${_id}`} className="block p-6 flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-heading uppercase tracking-wider">{category}</span>
                        <span className="text-sm text-meta-text">{createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2 text-heading">{title}</h2>
                    </Link>
                    <div className="flex justify-end items-center gap-4 p-3 bg-card-bg/10 border-t border-card">
                      <Link
                        to={`/edit-post/${_id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-heading hover:text-heading-dark transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                        Düzenle
                      </Link>
                      <button
                        onClick={() => handleDelete(_id)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                        Sil
                      </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-full text-center py-10 bg-card-bg/50 rounded-lg shadow">
                <p className="text-heading font-semibold">Aradığınız kriterlere uygun yazınız bulunamadı.</p>
              </div>
            )
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-meta-text">Henüz hiç yazı yayınlamamışsınız.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;
