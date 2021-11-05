import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import Posts from '../components/post/Posts';
import { rootState } from '../store';

const Home: NextPage = () => {
  return <Posts />;
};

export default Home;
