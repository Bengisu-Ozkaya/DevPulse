// src/pages/MyPostsPage.jsx
import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { getMyPosts } from '../services/api';

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await getMyPosts();
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Yazılarınız yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-black mb-2">Yazılarım</h1>
        <p className="text-meta">Yayınladığınız tüm yazılar.</p>
      </div>

      {loading && <p className="text-center">Yükleniyor...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">Henüz hiç yazı yayınlamamışsınız.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;
