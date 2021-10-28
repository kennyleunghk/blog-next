import React, { FC } from 'react';
import { PostModel } from '../../models/PostModel';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import PostCard from './PostCard';

interface AppProps {
  posts: PostModel[] | any;
}

const PostsWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

const Posts: FC<AppProps> = ({ posts }) => {
  return (
    <PostsWrapper>
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={{ xs: 2, sm: 2, md: 5 }}>
        {posts.map((post: PostModel) => (
          <PostCard key={post.Id} post={post} />
        ))}
      </Stack>
    </PostsWrapper>
  );
};

export default Posts;
