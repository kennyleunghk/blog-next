import React, {
  ChangeEvent,
  FC,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import useAuth from '../../../hooks/useAuth';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
  Stack,
} from '@mui/material';
import uuid from 'react-uuid';
import ImagePreview from '../../images/ImagePreview';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { CategoryModel } from '../../../models/CategoryModel';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useHttp, useImageUpload } from '../../../hooks/useHttp';
import { messageActions } from '../../../store/slices/message-slice';
import { BACKEND } from '../../../config';
import { rootState } from '../../../store';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { PostModel } from '../../../models/PostModel';
import { postActions } from '../../../store/slices/post-slice';
import axios from 'axios';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const PostForm = ({ post }) => {
  const router = useRouter();
  const edit = useSelector((state) => state.post.edit);
  const [postFormData, setPostFormData] = useState({
    Title: '',
    CoverImg: '',
    Description: '',
    Tags: '',
    Category: 0,
  });

  const [markdownData, setMarkdownData] = useState('');

  const [errorFlag, setErrorFlag] = useState({
    title: false,
    image: false,
    description: false,
    category: false,
    content: false,
  });

  const [focusFlag, setFocusFlag] = useState({
    title: false,
    image: false,
    description: false,
    category: false,
    content: false,
  });

  const [submittable, setSubmittable] = useState(false);

  const focusHandler = (e) => {
    switch (e.target.id) {
      case 'title': {
        setFocusFlag({ ...focusFlag, title: true });
        break;
      }
      case 'description': {
        setFocusFlag({ ...focusFlag, description: true });
        break;
      }
      case 'category': {
        setFocusFlag({ ...focusFlag, category: true });
        break;
      }
      default: {
        setFocusFlag({ ...focusFlag, category: true });
        break;
      }
    }
  };

  const formUpdateHandler = (e) => {
    if (e.type === 'click') {
      setPostFormData({
        ...postFormData,
        Category: e.target.value,
      });
    } else {
      switch (e.target.id) {
        case 'title': {
          setPostFormData({
            ...postFormData,
            Title: e.target.value,
          });
          break;
        }
        case 'description': {
          setPostFormData({
            ...postFormData,
            Description: e.target.value,
          });
          break;
        }
        case 'tags': {
          setPostFormData({
            ...postFormData,
            Tags: e.target.value,
          });
          break;
        }
        default:
          setPostFormData({
            ...postFormData,
          });
      }
    }
  };
  const formValidator = async (formType) => {
    switch (formType) {
      case 'new': {
        break;
      }
      case 'edit': {
        console.log('in edit');
        if (postFormData.Title.trim().length === 0) {
          console.log('title error');
          await setErrorFlag({ ...errorFlag, title: true });
          break;
        }
        if (postFormData.Category === 0) {
          console.log('cate error');
          await setErrorFlag({ ...errorFlag, category: true });
          break;
        }
        if (postFormData.CoverImg.length === 0) {
          console.log('img error');
          await setErrorFlag({ ...errorFlag, image: true });
          break;
        }
        if (postFormData.Description.trim().length === 0) {
          console.log('desc error');
          await setErrorFlag({ ...errorFlag, description: true });
          break;
        }
        console.log('set true');
        await setSubmittable(true);
        return await { submittable: true };
      }
      default:
        console.log('Form Type error');
        break;
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (edit) {
      setPostFormData({
        Title: post.Title,
        CoverImg: post.CoverImg,
        Description: post.Description,
        Tags: post.Tags,
        Category: parseInt(post.Category),
      });
      setMarkdownData(post.Contents);
    }
  }, [edit]);

  useEffect(() => {
    console.log(submittable);
  }, [submittable]);

  const imageUploadHandler = async (e) => {
    const result = await useImageUpload(e.target.files[0]);
    if (result.success) {
      await dispatch(messageActions.setSuccess(result.success));
      await setPostFormData({
        ...postFormData,
        CoverImg: result.image,
      });
    } else {
      await dispatch(messageActions.setError(result.error));
    }
  };

  const categories = useSelector((state) => state.post.categories);

  const addNewPost = async () => {
    try {
      const created = await useHttp('put', `${BACKEND}/Post/create`, data);
      if (created) {
        await dispatch(messageActions.setSuccess(created.data.msg));
        await dispatch(
          postActions.addPost({
            ...postFormData,
            Id: uuid(),
            Contents: markdownData,
          })
        );
        setTimeout(() => {
          router.push(`/Post/${created.data.insertId}`);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const options = {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    };

    if (edit) {
      try {
        const validated = await formValidator('edit');
        if (validated) {
          console.log(localStorage.getItem('token'));
          const result = await axios.patch(
            `${BACKEND}/Post/updatePost`,
            {
              ...postFormData,
              Id: post.Id,
              Contents: markdownData,
            },
            options
          );
          if (result) {
            console.log(result);
            await dispatch(messageActions.setSuccess('success'));
            await router.push('/');
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      await formValidator('new');
      // await addNewPost();
    }

    // if (postValidator.submittable) {
    //   console.log('submittable');
    // switch (edit) {
    //   case true:

    //     break;
    //   case false: {

    //     break;
    //   }
    // }
    // } else {
    //   console.log('unsubmittable');
    // }
  };

  const textFieldProps = {
    size: 'small',
    color: 'secondary',
    sx: { margin: '0.8rem 0' },
  };
  return (
    <Box
      component='form'
      onSubmit={submitHandler}
      autoComplete='off'
      sx={{ padding: '1rem 1rem' }}
    >
      {postFormData.CoverImg !== '' ? (
        <ImagePreview
          path={postFormData.CoverImg}
          onClosed={() =>
            setPostFormData({
              ...postFormData,
              CoverImg: '',
            })
          }
        />
      ) : (
        <label htmlFor='post-image'>
          <Input
            id='post-image'
            type='file'
            sx={{ display: 'none' }}
            onChange={imageUploadHandler}
          />
          <Button
            variant='contained'
            component='span'
            size='small'
            startIcon={<PhotoCamera fontSize='small' />}
          >
            Upload
          </Button>
        </label>
      )}
      <TextField
        {...textFieldProps}
        id='title'
        label='Title *'
        value={postFormData.Title}
        onChange={formUpdateHandler}
        error={errorFlag.title}
        onFocus={focusHandler}
        fullWidth
      />
      <TextField
        {...textFieldProps}
        id='description'
        label='Description *'
        value={postFormData.Description}
        error={errorFlag.description}
        onChange={formUpdateHandler}
        onFocus={focusHandler}
        fullWidth
      />
      <TextField
        {...textFieldProps}
        id='tags'
        label='Tags'
        value={postFormData.Tags}
        sx={{ width: '50%', paddingRight: 1, margin: '0.8rem 0' }}
        onChange={formUpdateHandler}
      />
      <FormControl
        size='small'
        sx={{ width: '50%', paddingLeft: 1, margin: '0.8rem 0' }}
      >
        <InputLabel id='demo-simple-select-label'>
          &nbsp;&nbsp;&nbsp;Category *
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='category'
          value={postFormData.Category}
          error={errorFlag.category}
          label='Category *'
          onChange={formUpdateHandler}
          onFocus={focusHandler}
          required
        >
          {categories.map((cate) => (
            <MenuItem key={cate.id} value={cate.id}>
              {cate.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <MDEditor
        value={markdownData}
        onChange={setMarkdownData}
        height='360'
        onFocus={focusHandler}
        style={{ margin: '0.8rem 0' }}
      />
      <Stack spacing={1} direction='row'>
        {edit ? (
          <>
            <Button
              variant='contained'
              type='submit'
              size='small'
              color='secondary'
            >
              Update
            </Button>
            <Button
              variant='contained'
              size='small'
              color='inherit'
              onClick={() => dispatch(postActions.setEdit())}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant='contained'
            type='submit'
            size='small'
            color='secondary'
          >
            Submit
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default useAuth(PostForm);
