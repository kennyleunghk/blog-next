import React from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';
import PostForm from './postForm/index.jsx';

const PostEdit = ({ post, edit }) => {
  return <PostForm post={post} />;
};

export default PostEdit;
