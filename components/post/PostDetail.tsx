import React, { FC } from 'react';
import moment from 'moment';
import {
  Paper,
  Box,
  Typography,
  Grid,
  Button,
  ButtonGroup,
} from '@mui/material';
import { PostModel } from '../../models/PostModel';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';

const Markdown: any = dynamic(
  (): any => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false }
);

interface AppProps {
  post: PostModel;
}

const PostDetail: FC<AppProps> = ({ post }) => {
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const props = {};
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h4' textAlign='center'>
          <b>{post.Title}</b>
        </Typography>
      </Grid>
      {isLoggedIn && (
        <Grid xs={12} textAlign='right'>
          <ButtonGroup
            variant='contained'
            size='small'
            aria-label='small button group'
          >
            <Button color='info'>Edit</Button>
            <Button color='secondary'>Disable</Button>
          </ButtonGroup>
        </Grid>
      )}

      <Grid item xs={12} textAlign='center'>
        <img
          style={{
            maxHeight: 300,
            maxWidth: '50%',
          }}
          src={`http://kennyleung-blog.sytes.net:9321/Static/Images/${post.CoverImg}`}
          alt={post.CoverImg}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='body2' textAlign='left'>
          Last Update:{' '}
          {moment(post.LastModified.substring(0, 22)).format(
            'HH:mm:ss | DD MMM, YYYY'
          )}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='body2' textAlign='right'>
          Create Time:{' '}
          {moment(post.CreatedTime.substring(0, 22)).format(
            'HH:mm:ss | DD MMM, YYYY'
          )}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6'>{post.Description}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Markdown source={post.Contents} />
      </Grid>
    </Grid>
  );
};

export default PostDetail;
