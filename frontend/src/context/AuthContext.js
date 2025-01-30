import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Initialize with null or a real userId from authentication logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (id) => {
    setUserId(id);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserId(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
