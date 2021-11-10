// SSG teamplate
import React, { useState } from 'react';
import { NextPage } from 'next';
import PostDetail from '../../components/post/PostDetail';
import { useHttp } from '../../hooks/useHttp';
import { BACKEND } from '../../config';
import { PostModel } from '../../models/PostModel';
import Comment from '../../components/post/comment';
import { Box } from '@mui/material';
import PostEdit from '../../components/post/PostEdit';
import { rootState } from '../../store';
import { useSelector } from 'react-redux';

const index: NextPage<PostModel> = ({ post }: any) => {
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const edit = useSelector((state: rootState) => state.post.edit);
  return (
    <Box>
      {edit && isLoggedIn ? (
        <PostEdit post={post} edit={edit} />
      ) : (
        <>
          <PostDetail post={post} />
          <Comment comments={post.Comments} />
        </>
      )}
    </Box>
  );
};

const datas = async () => {
  const result = await useHttp('get', `${BACKEND}/LoadData/Posts`, null);
  if (result) {
    return await result.map((re) => {
      return {
        params: {
          postId: re.Id.toString(),
        },
      };
    });
  }
};

export const getStaticPaths = async () => {
  return {
    fallback: true,
    paths: await datas(),
  };
};

export const getStaticProps = async (context) => {
  const postId = context.params.postId;
  const options = {
    body: {
      PostId: postId,
    },
    hearders: {
      'Content-Type': 'application/json',
    },
  };
  const result = await useHttp('post', `${BACKEND}/Loaddata/FindPost`, options);
  return {
    props: {
      post: result.data,
    },
    revalidate: 60,
  };
};

export default index;
