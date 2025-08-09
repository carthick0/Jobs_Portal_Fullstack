import React, { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const login = (email, password) => {
    if (email === "admin@example.com" && password === "admin123") {
      setUser({ role: "admin" });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const testCredentials = {
    email: "admin@example.com",
    password: "admin123",
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, testCredentials }}>
      {children}
    </AuthContext.Provider>
  );
}
