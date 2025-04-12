// client/src/components/layout/Header.js

import React, { useState } from 'react';
import { 
  AppBar, 
  Avatar, 
  Badge, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Toolbar, 
  Tooltip, 
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };
  
  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleProfile = () => {
    navigate('/profile');
    handleCloseUserMenu();
  };
  
  const handleSettings = () => {
    navigate('/settings');
    handleCloseUserMenu();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{
        width: { lg: `calc(100% - 280px)` },
        ml: { lg: '280px' },
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        color: 'text.primary'
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography
          variant="h6"
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold' }}
        >
          Sistema de Gestão de Qualidade
        </Typography>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Notificações */}
          <Tooltip title="Notificações">
            <IconButton
              color="inherit"
              onClick={handleOpenNotificationsMenu}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {/* Menu do utilizador */}
          <Tooltip title="Opções">
            <IconButton onClick={handleOpenUserMenu} sx={{ ml: 1 }}>
              <Avatar 
                alt={user?.nome || 'Usuário'} 
                src={user?.avatar || ''} 
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* Menu de utilizador dropdown */}
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleProfile}>
            <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography textAlign="center">Perfil</Typography>
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <SettingsIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography textAlign="center">Configurações</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography textAlign="center">Sair</Typography>
          </MenuItem>
        </Menu>
        
        {/* Menu de notificações dropdown */}
        <Menu
          sx={{ mt: '45px' }}
          id="menu-notifications"
          anchorEl={anchorElNotifications}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElNotifications)}
          onClose={handleCloseNotificationsMenu}
        >
          <MenuItem onClick={handleCloseNotificationsMenu}>
            <Typography textAlign="center">
              Nova não conformidade registada
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNotificationsMenu}>
            <Typography textAlign="center">
              Documento pendente de aprovação
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNotificationsMenu}>
            <Typography textAlign="center">
              Lembrete: ensaio programado para hoje
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
