import React, { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useHttp } from '../../../hooks/useHttp';
import { BACKEND } from '../../../config';
import {
  Button,
  Grid,
  GridProps,
  TextField,
  TextFieldProps,
} from '@mui/material';

const NewComment = ({ updateComment }: any) => {
  const { postId } = useRouter().query;
  const [commentData, setCommentData] = useState({
    PostId: parseInt(postId.toString()),
    Name: '',
    Email: '',
    Comment: '',
  });
  const [focus, setFocus] = useState({
    Name: false,
    Email: false,
    Comment: false,
  });
  const [error, setError] = useState({
    Name: false,
    Email: false,
    Comment: false,
  });

  const [submittable, setSubmittable] = useState(false);
  useEffect(() => {
    if (
      error.Name === false &&
      focus.Name === true &&
      error.Comment === false &&
      focus.Comment === true &&
      error.Email === false
    ) {
      setSubmittable(true);
    } else {
      setSubmittable(false);
    }
  }, [error]);

  const submitComment = async (event) => {
    event.preventDefault();
    try {
      if (submittable) {
        const result = await useHttp('put', `${BACKEND}/Comment/add`, {
          body: { Comment: commentData },
          headers: {},
        });
        if (result.statusText === 'OK') {
          updateComment({ ...commentData, Id: 'temp' });
        }
      } else {
        alert('form not completed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (focus.Name === true && commentData.Name.length === 0) {
      setError({ ...error, Name: true });
    } else {
      setError({ ...error, Name: false });
    }
  }, [commentData.Name, focus.Name]);

  useEffect(() => {
    if (
      focus.Email === true &&
      commentData.Email !== '' &&
      !commentData.Email.includes('@')
    ) {
      setError({ ...error, Email: true });
    } else {
      setError({ ...error, Email: false });
    }
  }, [commentData.Email, focus.Email]);

  useEffect(() => {
    if (focus.Comment === true && commentData.Comment === '') {
      setError({ ...error, Comment: true });
    } else {
      setError({ ...error, Comment: false });
    }
  }, [commentData.Comment, focus.Comment]);

  const commentHandler = async (e) => {
    switch (e.target.id) {
      case 'name': {
        await setCommentData({
          ...commentData,
          Name: e.target.value,
        });
        break;
      }
      case 'email': {
        await setCommentData({
          ...commentData,
          Email: e.target.value,
        });
        break;
      }
      case 'textArea': {
        setCommentData({
          ...commentData,
          Comment: e.target.value,
        });
        break;
      }
    }
  };

  const focusHandler = (e) => {
    switch (e.target.id) {
      case 'name': {
        setFocus({ ...focus, Name: true });
        break;
      }
      case 'email': {
        setFocus({ ...focus, Email: true });
        break;
      }
      case 'textArea': {
        setFocus({ ...focus, Comment: true });
        break;
      }
    }
  };

  const textFieldProps: TextFieldProps = {
    size: 'small',
    color: 'secondary',
    fullWidth: true,
    onChange: commentHandler,
    onFocus: focusHandler,
  };

  const formControlProps: GridProps = {
    sx: { padding: '0.5rem 0.5rem' },
    xs: 12,
    item: true,
  };

  return (
    <Grid
      component='form'
      onSubmit={submitComment}
      sx={{ marginBottom: '0.5rem' }}
    >
      <Grid container spacing={0} bgcolor='white' borderRadius='5px'>
        <Grid md={6} lg={6} {...formControlProps}>
          <TextField
            {...textFieldProps}
            id='name'
            label='Name *'
            placeholder='required'
            color='info'
            value={commentData.Name}
            error={error.Name === true && true}
          />
        </Grid>

        <Grid md={6} lg={6} {...formControlProps}>
          <TextField
            {...textFieldProps}
            id='email'
            label='Email'
            placeholder='optional'
            value={commentData.Email}
            error={error.Email}
          />
        </Grid>
        <Grid {...formControlProps} md={12} lg={12}>
          <TextField
            {...textFieldProps}
            id='textArea'
            label='Comment'
            placeholder='Tell me what you think (At least 20 words)'
            multiline
            minRows={3}
            value={commentData.Comment}
            onChange={commentHandler}
            error={error.Comment}
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
