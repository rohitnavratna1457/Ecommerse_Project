import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../utils/auth';

const SellerRoute = ({ children }) => {
  const token = localStorage.getItem('access');
  const userType = localStorage.getItem('user_type');
  const isValid = token && verifyToken(token);
  
  if (!isValid) {
    localStorage.clear();
    return <Navigate to="/seller-login" />;
  }
  
  if (userType !== 'Seller') {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};

export default SellerRoute; 