// client/src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// URL base da API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Criar contexto de autenticação
const AuthContext = createContext();

// Hook para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  // Verificar token ao carregar
  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          // Verificar se o token é válido
          const decoded = jwt_decode(token);
          
          // Verificar se o token não expirou
          if (decoded.exp * 1000 < Date.now()) {
            logout();
            return;
          }
          
          // Configurar o cabeçalho de autorização para todas as requisições
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Buscar informações do usuário
          const response = await axios.get(`${API_URL}/auth/me`);
          setUser(response.data);
        } catch (err) {
          console.error('Erro ao verificar token:', err);
          logout();
        }
      }
      
      setLoading(false);
    };
    
    checkToken();
  }, [token]);
  
  // Login do usuário
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      // Guardar token no localStorage
      localStorage.setItem('token', token);
      
      // Configurar o cabeçalho de autorização
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
      
      return user;
    } catch (err) {
      console.error('Erro ao realizar login:', err);
      const errorMessage = err.response?.data?.message || 'Erro ao realizar login';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  // Logout do usuário
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };
  
  // Verificar se o usuário está autenticado
  const isAuthenticated = () => {
    return !!token && !!user;
  };
  
  // Verificar se o usuário tem uma permissão específica
  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };
  
  // Valor do contexto
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    hasPermission
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
