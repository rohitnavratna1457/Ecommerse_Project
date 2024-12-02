import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../utils/auth';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access');
  const isValid = token && verifyToken(token);
  
  if (!isValid) {
    localStorage.clear(); // Clear invalid tokens
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute; 