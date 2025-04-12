// client/src/App.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

// Páginas de Módulos
import DocumentosPage from './pages/documentos/DocumentosPage';
import EnsaiosPage from './pages/ensaios/EnsaiosPage';
import EnsaioDashboardPage from './pages/ensaios/EnsaioDashboardPage';
import AddEnsaioPage from './pages/ensaios/AddEnsaioPage';
import EditEnsaioPage from './pages/ensaios/EditEnsaioPage';
import EnsaioDetailsPage from './pages/ensaios/EnsaioDetailsPage';
import NCPage from './pages/nc/NCPage';
import ChecklistsPage from './pages/checklists/ChecklistsPage';
import FornecedoresPage from './pages/fornecedores/FornecedoresPage';
import MateriaisPage from './pages/materiais/MateriaisPage';
import ProjetosPage from './pages/projetos/ProjetosPage';

// Context
import { AuthProvider } from './context/AuthContext';

// Componentes
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Tema da aplicação
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Rotas protegidas */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Módulo de Projetos */}
            <Route path="/projetos" element={<ProjetosPage />} />
            
            {/* Módulo de Documentos */}
            <Route path="/documentos" element={<DocumentosPage />} />
            
            {/* Módulo de Ensaios */}
            <Route path="/ensaios" element={<EnsaiosPage />} />
            <Route path="/ensaios/dashboard" element={<EnsaioDashboardPage />} />
            <Route path="/ensaios/adicionar" element={<AddEnsaioPage />} />
            <Route path="/ensaios/editar/:id" element={<EditEnsaioPage />} />
            <Route path="/ensaios/:id" element={<EnsaioDetailsPage />} />
            
            {/* Módulo de Não Conformidades */}
            <Route path="/nao-conformidades" element={<NCPage />} />
            
            {/* Módulo de Checklists */}
            <Route path="/checklists" element={<ChecklistsPage />} />
            
            {/* Módulo de Fornecedores */}
            <Route path="/fornecedores" element={<FornecedoresPage />} />
            
            {/* Módulo de Materiais */}
            <Route path="/materiais" element={<MateriaisPage />} />
          </Route>
          
          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
