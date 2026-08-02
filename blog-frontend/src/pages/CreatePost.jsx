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
      setError('All fields are required.');
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Create New Post</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-6">{error}</div>}
          
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
              placeholder="Your post title"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
              placeholder="e.g., Technology, Lifestyle"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
              placeholder="Write your amazing post here..."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
