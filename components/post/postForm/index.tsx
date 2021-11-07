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
} from '@mui/material';
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
import { NewPostModel } from '../../../models/NewPostModel';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { PostModel } from '../../../models/PostModel';

const MDEditor: any = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface PostFormProps {
  edit: boolean;
  post: PostModel;
}

const PostForm: FC<PostFormProps> = ({ edit, post }) => {
  const router = useRouter();
  const [postFormData, setpostFormData] = useState<NewPostModel>({
    Title: '',
    CoverImg: '',
    Description: '',
    Tags: '',
    Category: 0,
  });
  const [markdownData, setMarkdownData] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(post);
    if (edit) {
      setpostFormData({
        Title: post.Title,
        CoverImg: post.CoverImg,
        Description: post.Description,
        Tags: post.Tags,
        Category: parseInt(post.Category),
      });
      setMarkdownData(post.Contents);
    }
  }, []);
  useEffect(() => {
    console.log(postFormData);
  }, [postFormData]);

  const formUpdateHandler = (e, value: string) => {
    switch (value.trim().toLowerCase()) {
      case 'title':
        setpostFormData({
          ...postFormData,
          Title: e.target.value,
        });
        break;
      case 'description':
        setpostFormData({
          ...postFormData,
          Description: e.target.value,
        });
        break;
      case 'tags':
        setpostFormData({
          ...postFormData,
          Tags: e.target.value,
        });
        break;
      case 'category':
        setpostFormData({
          ...postFormData,
          Category: parseInt(e.target.value),
        });
        break;
      default:
        setpostFormData({
          ...postFormData,
        });
    }
  };

  const imageUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const result = await useImageUpload(e.target.files[0]);
    if (result.success) {
      await dispatch(messageActions.setSuccess(result.success));
      await setpostFormData({
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
    const created: any = await useHttp('put', `${BACKEND}/Post/create`, data);
    if (created) {
      await dispatch(messageActions.setSuccess(created.data.msg));
      setTimeout(() => {
        router.push(`/Post/${created.data.insertId}`);
      }, 1000);
    }
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
            setpostFormData({
              ...postFormData,
              CoverImg: '',
            })
          }
        />
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
        value={postFormData.Title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          formUpdateHandler(e, 'title')
        }
        fullWidth
      />
      <TextField
        {...textFieldProps}
        id='description'
        label='Description *'
        value={postFormData.Description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          formUpdateHandler(e, 'description')
        }
        fullWidth
      />
      <TextField
        {...textFieldProps}
        id='tags'
        label='Tags'
        value={postFormData.Tags}
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
          value={postFormData.Category}
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
      {edit ? (
        <Button
          variant='contained'
          type='submit'
          size='small'
          color='secondary'
          sx={{ margin: '0.8rem 0' }}
        >
          Update
        </Button>
      ) : (
        <Button
          variant='contained'
          type='submit'
          size='small'
          color='secondary'
          sx={{ margin: '0.8rem 0' }}
        >
          Submit
        </Button>
      )}
    </Box>
  );
};

export default useAuth(PostForm);