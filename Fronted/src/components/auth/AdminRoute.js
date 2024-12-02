import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../utils/auth';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('access');
  const userType = localStorage.getItem('user_type');
  const isValid = token && verifyToken(token);
  
  if (!isValid) {
    localStorage.clear();
    return <Navigate to="/login" />;
  }
  
  if (userType !== 'Admin') {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};

export default AdminRoute; 