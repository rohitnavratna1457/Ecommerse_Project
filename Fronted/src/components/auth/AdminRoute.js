import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isAdmin()) {
    return <Navigate to="/seller/dashboard/*" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute; 