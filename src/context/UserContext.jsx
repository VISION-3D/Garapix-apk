import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const response = await axios.get('/api/auth/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Erreur chargement utilisateur:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, rememberMe = false) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password, rememberMe });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
    toast.success('Connexion réussie');
    return { success: true };
  } catch (error) {
    toast.error(error.response?.data?.error || 'Échec de la connexion');
    return { success: false, error: error.response?.data?.error };
  }
};
  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      toast.success('Inscription réussie');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.error || 'Échec de l\'inscription');
      return { success: false, error: error.response?.data?.error };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Déconnexion réussie');
  };

  const value = {
    user,
    loading,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};