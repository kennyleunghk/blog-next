import { Container, Box, Typography } from '@mui/material';
import { textAlign } from '@mui/system';
import React from 'react';
import LoginForm from '../../components/login/LoginForm';

const index = () => {
  return (
    <Box>
      <Container component='div' maxWidth='xs'>
        <Typography variant='h4' align='center' sx={{ marginTop: 5 }}>
          Please Login
        </Typography>
        <LoginForm />
      </Container>
    </Box>
  );
};

export default index;
