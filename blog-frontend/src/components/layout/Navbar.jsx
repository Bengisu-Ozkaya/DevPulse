import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isProfileOpen, setIsProfileOpen] = useState(false); // For profile dropdown
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Effect to handle clicking outside of the profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to listen for token changes (login/logout in other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    // Also add a custom event for login
    window.addEventListener('token-changed', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('token-changed', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsProfileOpen(false); // Close dropdown on logout
    navigate('/');
    window.dispatchEvent(new Event('token-changed'));
  };

  return (
    <nav className="bg-heading shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-app">
              DevPulse
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {token ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="p-2 rounded-full text-app/80 hover:text-app focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-heading focus:ring-brand-blue"
                  >
                     <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                  </button>
                  {isProfileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-heading ring-1 ring-heading ring-opacity-20 z-50">
                      <Link
                        to="/my-posts"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-sm bg-heading text-app hover:bg-heading-dark hover:text-white"
                      >
                        Yazılarım
                      </Link>
                      <Link
                        to="/create-post"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-sm bg-heading text-app hover:bg-heading-dark hover:text-white"
                      >
                        Yazı Ekle
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm bg-heading text-app hover:bg-heading-dark hover:text-white"
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-app/80 hover:text-app px-3 py-2 rounded-md text-sm font-medium"
                >
                  Giriş Yap / Kaydol
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-transparent inline-flex items-center justify-center p-2 rounded-md text-app/80 hover:text-app focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-heading focus:ring-brand-blue"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                 </svg>
              ) : (
                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                 </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-heading" id="mobile-menu" ref={mobileMenuRef}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-heading">
            {token ? (
              <>
                <Link
                  to="/my-posts"
                  onClick={() => setIsOpen(false)}
                  className="text-app hover:bg-heading-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Yazılarım
                </Link>
                <Link
                  to="/create-post"
                  onClick={() => setIsOpen(false)}
                  className="text-app hover:bg-heading-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Yazı Ekle
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="text-app hover:bg-heading-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-heading hover:bg-brand-blue hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                Giriş Yap / Kaydol
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
