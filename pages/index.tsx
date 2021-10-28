import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import Posts from '../components/post/Posts';
import { rootState } from '../store';

import { PostModel } from '../models/PostModel';

const Home: NextPage = () => {
  const posts: PostModel[] = useSelector(
    (state: rootState) => state.post.posts,
  );

  const props = {
    posts,
  };

  return <Posts {...props} />;
};

export default Home;
