// client/src/components/layout/Layout.js

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';

import Header from './Header';
import SideMenu from './SideMenu';

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setSideMenuOpen(!sideMenuOpen);
  };
  
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Header onDrawerToggle={handleDrawerToggle} />
      
      <SideMenu 
        open={sideMenuOpen} 
        onClose={() => setSideMenuOpen(false)} 
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          width: { lg: `calc(100% - 280px)` },
          marginLeft: { lg: '280px' },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          overflowY: 'auto',
          height: '100vh',
          backgroundColor: 'background.default'
        }}
      >
        <Toolbar /> {/* Espaçamento para o header fixo */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
