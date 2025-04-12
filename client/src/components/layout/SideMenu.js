// client/src/components/layout/SideMenu.js

import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Collapse,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as DocumentIcon,
  Science as ScienceIcon,
  Inventory as InventoryIcon,
  Business as BusinessIcon,
  WarningAmber as WarningIcon,
  CheckBox as CheckBoxIcon,
  Assessment as AssessmentIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  FolderSpecial as ProjectIcon
} from '@mui/icons-material';

// Configuração dos itens do menu
const menuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />
  },
  {
    title: 'Projetos',
    path: '/projetos',
    icon: <ProjectIcon />
  },
  {
    title: 'Documentos',
    path: '/documentos',
    icon: <DocumentIcon />
  },
  {
    title: 'Ensaios',
    path: '/ensaios',
    icon: <ScienceIcon />,
    submenu: [
      {
        title: 'Lista de Ensaios',
        path: '/ensaios'
      },
      {
        title: 'Dashboard de Ensaios',
        path: '/ensaios/dashboard'
      },
      {
        title: 'Novo Ensaio',
        path: '/ensaios/adicionar'
      }
    ]
  },
  {
    title: 'Não Conformidades',
    path: '/nao-conformidades',
    icon: <WarningIcon />
  },
  {
    title: 'Checklists',
    path: '/checklists',
    icon: <CheckBoxIcon />
  },
  {
    title: 'Fornecedores',
    path: '/fornecedores',
    icon: <BusinessIcon />
  },
  {
    title: 'Materiais',
    path: '/materiais',
    icon: <InventoryIcon />
  },
  {
    title: 'Relatórios',
    path: '/relatorios',
    icon: <AssessmentIcon />
  }
];

const SideMenu = ({ open, onClose }) => {
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
  // Estado para controlar expansão dos submenus
  const [expandedItems, setExpandedItems] = useState({});
  
  // Verificar se o caminho atual está em algum submenu e expandir automaticamente
  useEffect(() => {
    const newExpandedItems = {};
    
    menuItems.forEach((item, index) => {
