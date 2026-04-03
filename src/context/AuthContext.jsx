// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  login as authLogin, 
  register as authRegister, 
  getCurrentUser,
  logout as authLogout 
} from '../services/authService';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await getCurrentUser();
        setUser(userData);
      }
    } catch (err) {
      console.error('Erreur lors du chargement de l\'utilisateur:', err);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await authLogin(email, password);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return { success: true, data };
    } catch (err) {
      setError(err.error || 'Échec de la connexion');
      return { success: false, error: err.error };
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const data = await authRegister(userData);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return { success: true, data };
    } catch (err) {
      setError(err.error || 'Échec de l\'inscription');
      return { success: false, error: err.error };
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};