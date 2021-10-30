import { useEffect } from 'react';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import Posts from '../components/post/Posts';
import { rootState } from '../store';

import { PostModel } from '../models/PostModel';

const Home: NextPage = () => {
  return <Posts />;
};

export default Home;
