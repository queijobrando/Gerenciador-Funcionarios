import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  isAuthenticated,
  isTokenExpired,
  logout,
  getToken,
  userInfo,
} from "../../services/authService";
import Loading from "../../components/misc/Loading";

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [redirect, setRedirect] = useState(null);
  const location = useLocation();
  const token = getToken();

  useEffect(() => {
    const verify = async () => {
      if (!isAuthenticated() || isTokenExpired()) {
        logout();
        setRedirect("/login");
        return;
      }

      const user = await userInfo();

      if (!user) {
        logout();
        setRedirect("/login");
        return;
      }

      if (!user.companyId && location.pathname !== "/create-company") {
        setRedirect("/create-company");
        return;
      }

      setChecking(false);
    };

    verify();
  }, [location.pathname]); 

  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  if (checking) {
    return <div><Loading size={6} /></div>;
  }

  return children;
};

export default ProtectedRoute;
