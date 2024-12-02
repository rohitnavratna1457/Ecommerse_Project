import API from '../Api/Api';

export const verifyToken = (token) => {
  try {
    // Decode token
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Check expiration
    if (payload.exp * 1000 < Date.now()) {
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Token verification failed:', err);
    return false;
  }
};

export const refreshUserToken = async () => {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) return false;
  
  try {
    const response = await API.post('account/token/refresh/', {
      refresh: refresh
    });
    
    if (response.data.access) {
      localStorage.setItem('access', response.data.access);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Token refresh failed:', err);
    return false;
  }
}; 