import React, { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // user will be { role: "admin" } or null

  const login = (email, password) => {
    // Hardcoded admin check - replace with real API if needed
    if (email === "admin@example.com" && password === "admin123") {
      setUser({ role: "admin" });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
