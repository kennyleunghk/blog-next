import React, {
  FC,
  useState,
  useEffect,
  FormEvent,
  FormEventHandler,
  ChangeEvent,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Paper,
  Button,
  Select,
  MenuItem,
  TextFieldProps,
} from '@mui/material';
import { rootState } from '../../store';
import { CategoryModel } from '../../models/CategoryModel';
import { NewPostModel } from '../../models/NewPostModel';

import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useImageUpload } from '../../hooks/useHttp';
import { messageActions } from '../../store/slices/message-slice';
import ImagePreview from '../images/ImagePreview';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const MDEditor: any = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const NewPost: FC = () => {
  const [newPostFormData, setNewPostFormData] = useState<NewPostModel>({
    Title: '',
    Image: '',
    Description: '',
    Tags: '',
    Category: 0,
  });
  const [markdownData, setMarkdownData] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(newPostFormData);
  }, [newPostFormData]);

  const formUpdateHandler = (e, value: string) => {
    switch (value.trim().toLowerCase()) {
      case 'title':
        setNewPostFormData({
          ...newPostFormData,
          Title: e.target.value,
        });
        break;
      case 'description':
        setNewPostFormData({
          ...newPostFormData,
          Description: e.target.value,
        });
        break;
      case 'tags':
        setNewPostFormData({
          ...newPostFormData,
          Tags: e.target.value,
        });
        break;
      case 'category':
        setNewPostFormData({
          ...newPostFormData,
          Category: parseInt(e.target.value),
        });
        break;
      default:
        setNewPostFormData({
          ...newPostFormData,
        });
    }
  };

  const imageUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const result = await useImageUpload(e.target.files[0]);
    if (result.success) {
      await dispatch(messageActions.setSuccess(result.success));
      await setNewPostFormData({
        ...newPostFormData,
        Image: result.image,
      });
    } else {
      await dispatch(messageActions.setError(result.error));
      clearImage();
    }
  };

  const clearImage = () => {
    setNewPostFormData({ ...newPostFormData, Image: '' });
  };

  const categories: Array<CategoryModel> = useSelector(
    (state: rootState) => state.post.categories
  );
  const submitHandler: FormEventHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  const textFieldProps: TextFieldProps = {
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
      {newPostFormData.Image !== '' ? (
        <ImagePreview path={newPostFormData.Image} onClosed={clearImage} />
      ) : (
        <label htmlFor='contained-button-file'>
          <Input
            id='contained-button-file'
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
        value={newPostFormData.Title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          formUpdateHandler(e, 'title')
        }
        fullWidth
      />
      <TextField
        {...textFieldProps}
        id='description'
        label='Description *'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          formUpdateHandler(e, 'description')
        }
        fullWidth
      />
      <TextField
        {...textFieldProps}
        id='tags'
        label='Tags'
        sx={{ width: '50%', paddingRight: 1, margin: '0.8rem 0' }}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          formUpdateHandler(e, 'tags')
        }
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
          id='demo-simple-select'
          value={newPostFormData.Category}
          label='Category *'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            formUpdateHandler(e, 'category')
          }
          required
        >
          {categories.map((cate: CategoryModel) => (
            <MenuItem key={cate.id} value={cate.id}>
              {cate.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <MDEditor
        value={markdownData}
        onChange={setMarkdownData}
        height='450'
        style={{ margin: '0.8rem 0' }}
      />
      <Button
        variant='contained'
        type='submit'
        size='small'
        color='secondary'
        sx={{ margin: '0.8rem 0' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default useAuth(NewPost);
