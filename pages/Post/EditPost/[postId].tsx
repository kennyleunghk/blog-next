import React from 'react';
import useAuth from '../../../hooks/useAuth';
import PostEdit from '../../../components/post/PostEdit';

const index = () => {
  return <PostEdit />;
};

export default useAuth(index);
