import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken } from '../services/authService';
import { jwtDecode } from 'jwt-decode'; 

const PrivateRoute = ({ children, roles = [] }) => {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const token = getToken();
      if (!token) throw new Error('No token');

      const user = jwtDecode(token);
      if (roles.length && !roles.includes(user.role)) {
        throw new Error('Unauthorized role');
      }

      setAuthorized(true);
    } catch {
      setAuthorized(false);
    } finally {
      setChecking(false);
    }
  }, [roles]);

  if (checking) {
    return <p className="text-center mt-4">🔐 Checking authentication...</p>;
  }

  return authorized ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;