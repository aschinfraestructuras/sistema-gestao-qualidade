// client/src/pages/NotFound.js

import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontSize: '8rem', fontWeight: 'bold', color: 'primary.main' }}>
            404
          </Typography>
          
          <Typography variant="h5" sx={{ mt: 2, mb: 4, color: 'text.secondary' }}>
            A página que está procurando não existe.
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 2 }}
          >
            Voltar para o Dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
