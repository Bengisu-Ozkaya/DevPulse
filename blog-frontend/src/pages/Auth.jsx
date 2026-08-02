import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
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
      setFormError('');
      navigate('/');
    } catch (error) {
      console.error(`${isLogin ? 'Login' : 'Registration'} failed:`, error);
      // Show backend validation/error messages to the user
      if (error.response && error.response.data) {
        const serverErrors = error.response.data.errors;
        if (serverErrors && serverErrors.length > 0) {
          const msg = serverErrors[0].msg || 'Hata oluştu';
          // Map specific backend messages to user-friendly text
          if (isLogin && msg === 'Geçersiz şifre') {
            setFormError('Parolayı Yanlış Girdiniz!');
          } else {
            setFormError(msg);
          }
        } else if (error.response.data.message) {
          setFormError(error.response.data.message);
        } else {
          setFormError('Hata oluştu. Lütfen tekrar deneyin.');
        }
      } else {
        setFormError('Sunucuya bağlanırken hata oluştu.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-app">
      <div className="w-full max-w-md p-8 space-y-8 bg-heading rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-app">{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
            <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="relative block w-full px-3 py-2 bg-app text-heading placeholder-secondary border border-card rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-app focus:border-app focus:z-10 sm:text-sm"
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
                  className={`relative block w-full px-3 py-2 bg-app text-heading placeholder-secondary border border-card rounded-none appearance-none ${!isLogin ? '' : 'rounded-t-md'} focus:outline-none focus:ring-app focus:border-app focus:z-10 sm:text-sm`}
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
                className="relative block w-full px-3 py-2 bg-app text-heading placeholder-secondary border border-card rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-app focus:border-app focus:z-10 sm:text-sm"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {formError && isLogin && (
                <p className="mt-2 text-sm text-app">{formError}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-heading bg-app border border-transparent rounded-md group hover:bg-app-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-app-hover"
            >
              <span className="text-heading">{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</span>
            </button>
          </div>
          {formError && !isLogin && (
            <div className="mt-3 text-sm text-app text-center">{formError}</div>
          )}
        </form>
        <div className="text-sm text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-app hover:text-app-hover">
            {isLogin ? 'Hesabın yok mu? Kayıt Ol' : 'Zaten hesabın var mı? Giriş Yap'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
