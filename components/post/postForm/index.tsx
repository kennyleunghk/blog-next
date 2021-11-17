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
import usePostForm from '../../../hooks/usePostForm';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { PostModel } from '../../../models/PostModel';
import { postActions } from '../../../store/slices/post-slice';

const MDEditor: any = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface PostFormProps {
  post: PostModel;
}

const PostForm: FC<PostFormProps> = ({ post }) => {
  const router = useRouter();
  const edit = useSelector((state: rootState) => state.post.edit);
  const [
    postFormData,
    markdownData,
    errorFlag,
    focusFlag,
    setPostFormData,
    setMarkdownData,
    formUpdateHandler,
    focusHandler,
    formValidator,
    submittable,
  ] = usePostForm();

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
    console.log(postFormData);
  }, [postFormData]);

  const imageUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
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

  const categories: Array<CategoryModel> = useSelector(
    (state: rootState) => state.post.categories
  );

  const submitHandler: FormEventHandler = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const data = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: {
        ...postFormData,
        Contents: markdownData,
      },
    };
    const updatePost = async () => {
      if (await submittable) {
        try {
          const updated: any = await useHttp(
            'patch',
            `${BACKEND}/Post/updatePost`,
            {
              ...data,
              body: {
                ...data.body,
                Id: post.Id,
              },
            }
          );
          if (updated) {
            await dispatch(messageActions.setSuccess(updated.data.msg));
            dispatch(postActions.setEdit());
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const addNewPost = async () => {
      try {
        const created: any = await useHttp(
          'put',
          `${BACKEND}/Post/create`,
          data
        );
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

    if (edit) {
      await formValidator('edit');

      await updatePost();
    } else {
      await formValidator('new');
      await addNewPost();
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
