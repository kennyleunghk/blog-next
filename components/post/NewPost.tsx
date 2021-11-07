import React, { FC } from 'react';

import useAuth from '../../hooks/useAuth';

import PostForm from './postForm';

const NewPost: FC = () => {
  return <PostForm />;
};

export default useAuth(NewPost);
