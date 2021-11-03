import { useEffect } from 'react';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import Posts from '../components/post/Posts';
import { rootState } from '../store';

import { PostModel } from '../models/PostModel';
interface ttt {
  testing: string;
}

const Home: NextPage<ttt> = ({ testing }) => {
  console.log(testing);
  return <Posts />;
};

export const getStaticProps = async () => {
  return {
    props: {
      testing: 'testing',
    },
  };
};

export default Home;
