// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { getPosts } from '../services/api';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Yazılar yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Blog Yazıları</h1>
        <p className="text-gray-600">En son yazıları keşfedin.</p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Yazı ara..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p className="text-center">Yükleniyor...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <p className="text-center col-span-full">Sonuç bulunamadı.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
