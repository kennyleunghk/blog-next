import { FC } from 'react';
import { Box, TextField, Typography } from '@mui/material';

const NewPost: FC = () => {
  return (
    <Box
      component='div'
      sx={{
        bgcolor: 'white',
        padding: '1rem 2rem',
        borderRadius: '0.6rem',
      }}>
      <Typography
        variant='h4'
        sx={{ padding: '1rem 1rem', textAlign: 'center', fontWeight: 'bold' }}>
        New Post
      </Typography>
      <Box component='form'>
        <TextField
          error
          id='outlined-error-helper-text'
          label='Error'
          fullWidth
          defaultValue='Hello World'
          helperText='Incorrect entry.'
        />
      </Box>
    </Box>
  );
};

export default NewPost;
