import { createContext, useState, useEffect } from "react";
import api from "../api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/check");
      setRole(res.data.data?.role || res.data.role);
      console.log("User role set to:", res.data.role);
    } catch {
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    await api.post("/auth/login", { email, password });
    await checkAuth();
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
