// client/src/components/auth/ProtectedRoute.js

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

/**
 * Componente para proteger rotas que requerem autenticação
 * Redireciona para a página de login se o usuário não estiver autenticado
 */
const ProtectedRoute = ({ children, requiredPermission = null }) => {
  const { isAuthenticated, loading, hasPermission } = useAuth();
  const location = useLocation();
  
  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  
  // Verificar autenticação
  if (!isAuthenticated()) {
    // Redirecionar para login, guardando o caminho original para retornar após login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Verificar permissão específica (se necessário)
  if (requiredPermission && !hasPermission(requiredPermission)) {
    // Redirecionar para página de acesso negado
    return <Navigate to="/acesso-negado" replace />;
  }
  
  // Se autenticado e com permissão, renderizar o conteúdo
  return children;
};

export default ProtectedRoute;
