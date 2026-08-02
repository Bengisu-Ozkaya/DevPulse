import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !category || !content) {
      setError('Başlık, kategori ve içerik alanları zorunludur.');
      return;
    }

    try {
      const postData = { title, category, content };
      await createPost(postData);
      // Başarıyla oluşturulduktan sonra anasayfaya yönlendir
      navigate('/');
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <h1 className="text-4xl font-bold text-heading mb-8">Yeni Yazı Oluştur</h1>
      <div className="bg-card/50 p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {error && <div className="bg-red-500/20 text-red-800 p-3 rounded-md mb-6">{error}</div>}
          
          <div className="mb-6">
            <label htmlFor="title" className="block text-heading/80 font-semibold mb-2">Başlık</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-app text-heading border border-card rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-shadow duration-200"
              placeholder="Yazı başlığı"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="category" className="block text-heading/80 font-semibold mb-2">Kategori</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-app text-heading border border-card rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-shadow duration-200"
              placeholder="Örn: Teknoloji, Yaşam Tarzı"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="content" className="block text-heading/80 font-semibold mb-2">İçerik</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              className="w-full px-4 py-2 bg-app text-heading border border-card rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-shadow duration-200"
              placeholder="Harika yazınızı buraya yazın..."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-heading rounded-lg hover:bg-heading-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card-bg focus:ring-heading transition-all"
            >
              Yazıyı Yayınla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
