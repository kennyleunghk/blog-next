import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import NewPost from '../../components/post/NewPost';

const index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Add New Blog</title>
        <meta name='Description' content='Post a new blog content' />
      </Head>
      <NewPost />
    </>
  );
};

export default index;
