import { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Posts from '../components/post/Posts';
import { rootState } from '../store';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kenny Leung blog</title>
        <meta
          name='Description'
          content='Kenny Leung personal blog for sharing IT technologies'
        />
      </Head>
      <Posts />
    </>
  );
};

export default Home;
