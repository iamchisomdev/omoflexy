import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if admin is stored in localStorage (set after successful login)
        const adminAuth = localStorage.getItem("adminAuth");
        if (adminAuth === "true") {
          setIsAuth(true);
          return;
        }

        // Otherwise, verify with backend
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include", // ✅ include cookies
        });

        if (res.ok) {
          setIsAuth(true);
          localStorage.setItem("adminAuth", "true");
        } else {
          setIsAuth(false);
          localStorage.removeItem("adminAuth");
        }
      } catch (err) {
        setIsAuth(false);
        localStorage.removeItem("adminAuth");
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>; // Or a spinner
  }

  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;