import { FC } from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@mui/material';

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
        <FormControl>
          <TextField
            size='small'
            label='Error'
            fullWidth
            defaultValue='Hello World'
          />
        </FormControl>
        <FormControl variant='filled' size='small' fullWidth color='secondary'>
          <InputLabel htmlFor='my-input'>Email address</InputLabel>
          <Input id='my-input' aria-describedby='my-helper-text' />
          <FormHelperText id='my-helper-text'>
            We'll never share your email.
          </FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
};

export default NewPost;
