// SSG teamplate
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
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
import { AppProps } from 'next/app';

const index = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const edit = useSelector((state) => state.post.edit);
  const [postState, setPostState] = useState(props.post);
  const updateComment = (comment) => {
    setPostState({
      ...props.post,
      Comments: [...props.post.Comments, comment],
    });
  };

  return (
    <>
      <Head>
        <title>{postState.Title}</title>
        <meta name='Description' content={postState.Description} />
      </Head>
      <Box>
        {edit && isLoggedIn ? (
          <PostEdit post={props.post} edit={edit} />
        ) : (
          <>
            <PostDetail post={props.post} />
            <Comment
              comments={postState.Comments}
              updateComment={updateComment}
            />
          </>
        )}
      </Box>
    </>
  );
};

const datas = async () => {
  try {
    const result = await useHttp('get', `${BACKEND}/LoadData/Posts`, null);
    const pathArray = new Array();
    if (result) {
      await result.map((re) => {
        pathArray.push({
          params: {
            postId: re.Id.toString(),
          },
        });
      });
    }
    return pathArray;
  } catch (error) {
    console.log(error);
  }
};

export const getStaticPaths = async () => {
  console.log(await datas());
  return {
    fallback: false,
    paths: await datas(),
  };
};

export const getStaticProps = async (context) => {
  try {
    const postId = context.params.postId;
    const options = {
      body: {
        PostId: postId,
      },
      hearders: {
        'Content-Type': 'application/json',
      },
    };
    const result = await useHttp(
      'post',
      `${BACKEND}/Loaddata/FindPost`,
      options
    );
    return {
      props: {
        post: result.data,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
  }
};

export default index;
