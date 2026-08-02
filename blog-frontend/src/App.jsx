import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Auth from './pages/Auth';
import CreatePost from './pages/CreatePost';
import MyPostsPage from './pages/MyPostsPage';
import EditPostPage from './pages/EditPostPage';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/my-posts" element={<MyPostsPage />} />
          <Route path="/edit-post/:id" element={<EditPostPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/login" element={<Auth />} />
    </Routes>
  );
}

export default App;
