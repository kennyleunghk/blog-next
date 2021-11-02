import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { rootState } from '../../store';
import Loading from '../../components/Loading';
import PostDetail from '../../components/post/PostDetail';

const index: NextPage = () => {
  const posts = useSelector((state: rootState) => state.post.posts);
  const { postId } = useRouter().query;

  const post = posts.filter((p) => p.Id == parseInt(postId.toString()));
  console.log(post[0]);
  return post.length === 0 ? <Loading /> : <PostDetail post={post[0]} />;
};

export default index;
