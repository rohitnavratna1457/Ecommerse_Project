import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SellerRoute = ({ children }) => {
  const { user, loading, isSeller } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isSeller()) {
    return <Navigate to="/seller/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default SellerRoute; 