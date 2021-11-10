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
  GridProps,
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
    fullWidth: true,
  };

  const formControlProps: GridProps = {
    sx: { padding: '0.5rem 0.5rem' },
    xs: 12,
    item: true,
  };

  return (
    <Grid component='form' onSubmit={submitComment}>
      <Grid container spacing={0} bgcolor='white' borderRadius='5px'>
        <Grid md={6} lg={6} {...formControlProps}>
          <TextField
            {...textFieldProps}
            id='outlined-basic'
            label='Name *'
            placeholder='required'
            color='info'
          />
        </Grid>

        <Grid md={6} lg={6} {...formControlProps}>
          <TextField
            {...textFieldProps}
            id='email'
            label='Email'
            placeholder='optional'
          />
        </Grid>
        <Grid {...formControlProps} md={12} lg={12}>
          <TextField
            {...textFieldProps}
            id='textArea'
            label='Comment'
            placeholder='Tell me what you think'
            multiline
            minRows={3}
          />
        </Grid>
        <Grid {...formControlProps} md={12} lg={12}>
          <Button
            variant='contained'
            size='small'
            color='secondary'
            type='submit'
          >
            Post
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewComment;
