import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const { data } = await api.post(endpoint, payload);
      localStorage.setItem('token', data.token);
      // Dispatch a custom event to notify other components (like Navbar)
      window.dispatchEvent(new Event('token-changed'));
      navigate('/');
    } catch (error) {
      console.error(`${isLogin ? 'Login' : 'Registration'} failed:`, error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-highlight rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-auth-text">{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="relative block w-full px-3 py-2 bg-white text-input-text placeholder-input-text border border-input-text rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                  placeholder="İsim"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`relative block w-full px-3 py-2 bg-white text-input-text placeholder-input-text border border-input-text rounded-none appearance-none ${!isLogin ? '' : 'rounded-t-md'} focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm`}
                placeholder="Email adresi"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 bg-white text-input-text placeholder-input-text border border-input-text rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-brand focus:border-brand focus:z-10 sm:text-sm"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-accent border border-transparent rounded-md group hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-auth-text hover:text-opacity-90">
            {isLogin ? 'Hesabın yok mu? Kayıt Ol' : 'Zaten hesabın var mı? Giriş Yap'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
