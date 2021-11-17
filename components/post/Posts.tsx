import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PostModel } from '../../models/PostModel';
import { styled } from '@mui/material/styles';
import { Box, Stack, Grid, Typography } from '@mui/material';
import PostCard from './PostCard';
import { rootState } from '../../store';
import { textAlign } from '@mui/system';

const PostsWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

const Posts = () => {
  const posts = useSelector((state: rootState) => state.post.posts);
  const showPosts = useSelector((state: rootState) => state.post.showPosts);

  return (
    <>
      {showPosts.length === 0 && (
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          height='600px'
          spacing={2}
        >
          <Typography
            variant='h4'
            sx={{ fontWeight: 'bold', color: '#E7451E' }}
          >
            Opps...Have Nothing...
          </Typography>
        </Grid>
      )}
      <Grid container justifyContent='center' spacing={2}>
        {showPosts.map((post: PostModel) => (
          <Grid
            key={post.Id}
            item
            xs={12}
            md={6}
            display='flex'
            justifyContent='center'
          >
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Posts;
