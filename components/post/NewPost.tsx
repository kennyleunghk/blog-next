import React, { FC, useState } from 'react';

import useAuth from '../../hooks/useAuth';

import PostForm from './postForm/index.jsx';

const NewPost: FC = () => {
  return <PostForm />;
};

export default useAuth(NewPost);
