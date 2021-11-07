import React from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';
import PostForm from './postForm';

const PostEdit = ({ post, edit }) => {
  return <PostForm edit post={post} />;
};

export default PostEdit;
