import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../store/index';

const Home: NextPage = () => {
  const counter = useSelector((state: rootState) => state.counter.counter);
  console.log(counter);
  return <div>{counter}</div>;
};

export default Home;
