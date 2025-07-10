import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, isTokenExpired, logout, getToken } from "../../services/authService";

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  useEffect(() => {
    if (token && isTokenExpired()) {
      logout();
    }
  }, [token]);

  if (!isAuthenticated() || (token && isTokenExpired())) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;