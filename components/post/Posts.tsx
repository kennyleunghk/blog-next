import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PostModel } from '../../models/PostModel';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
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
    <PostsWrapper>
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={{ xs: 2, sm: 2, md: 5 }}
      >
        {showPosts.map((post: PostModel) => (
          <PostCard key={post.Id} post={post} />
        ))}
      </Stack>
    </PostsWrapper>
  );
};

export default Posts;
