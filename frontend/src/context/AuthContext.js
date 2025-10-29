import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email, motDePasse) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", { email, motDePasse });
      const { user, access_token } = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", access_token);
      setUser(user);
      return { success: true };
    } catch {
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
