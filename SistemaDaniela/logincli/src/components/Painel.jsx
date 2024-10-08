import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const Painel = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'white', mt: 4 }}>
        <Typography component="h1" variant="h5" sx={{ color: '#00a86b' }}>
          Bem-vindo ao seu Painel
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Você está logado com sucesso!
        </Typography>
      </Paper>
    </Container>
  );
};

export default Painel;