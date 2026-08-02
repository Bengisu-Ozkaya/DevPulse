import axios from 'axios';

const API_URL = 'https://devpulse-backend-1gpf.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Post APIs
export const getPosts = () => api.get('/posts');
export const getPostById = (id) => api.get(`/posts/${id}`);
export const getMyPosts = () => api.get('/posts/my-posts');
export const createPost = (postData) => api.post('/posts', postData);
export const updatePost = (id, postData) => api.put(`/posts/${id}`, postData);
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Auth APIs
export const login = (userData) => api.post('/auth/login', userData);
export const register = (userData) => api.post('/auth/register', userData);
export const getUserProfile = () => api.get('/auth/profile');

export default api;
