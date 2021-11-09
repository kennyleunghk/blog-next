import React, { useState, FC } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useHttp } from '../../../hooks/useHttp';
import { BACKEND } from '../../../config';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
  TextFieldProps,
} from '@mui/material';

const NewComment: FC = () => {
  const { postId } = useRouter().query;
  const [commentData, setCommentData] = useState({
    PostId: parseInt(postId.toString()),
    Name: '',
    Email: '',
    Comment: '',
  });

  const submitComment = async (event) => {
    event.preventDefault();
    console.log('submitted');
    // try {
    //   const result = await useHttp('put', `${BACKEND}/Comment`, {
    //     Comment: commentData,
    //   });
    //   if (result.statusText === 'OK') {
    //     addComment({
    //       ...formData,
    //       Id: result.data.CommentId,
    //       CreatedTime: moment(Date.now()).format('YYYY-MM-DDTHH:mm:ss.SSS'),
    //     });
    //     setFormData({
    //       ...formData,
    //       Name: '',
    //       Email: '',
    //       Comment: '',
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const textFieldProps: TextFieldProps = {
    size: 'small',
    color: 'secondary',
    sx: { margin: '0.4rem 0' },
    fullWidth: true,
  };

  return (
    <Grid component='form' onSubmit={submitComment}>
      <TextField
        {...textFieldProps}
        id='outlined-basic'
        label='Name *'
        placeholder='required'
        color='info'
      />
      <TextField
        {...textFieldProps}
        id='email'
        label='Email'
        placeholder='optional'
      />
      <TextField
        {...textFieldProps}
        id='textArea'
        label='Comment'
        placeholder='Tell me what you think'
        multiline
        minRows={3}
      />
      <Button variant='contained' size='small' color='secondary' type='submit'>
        Post
      </Button>
    </Grid>
  );
};

export default NewComment;
