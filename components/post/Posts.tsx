import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PostModel } from '../../models/PostModel';
import { styled } from '@mui/material/styles';
import { Box, Stack, Grid } from '@mui/material';
import PostCard from './PostCard';
import { rootState } from '../../store';

const PostsWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

const Posts = () => {
  const posts = useSelector((state: rootState) => state.post.posts);
  const showPosts = useSelector((state: rootState) => state.post.showPosts);

  return (
    <Grid container spacing={2}>
      {showPosts.map((post: PostModel) => (
        <PostCard key={post.Id} post={post} />
      ))}
    </Grid>
  );
};

export default Posts;
