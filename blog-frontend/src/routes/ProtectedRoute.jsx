import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // Token varsa, alt bileşenleri (Outlet) render et.
  // Token yoksa, kullanıcıyı login sayfasına yönlendir.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
