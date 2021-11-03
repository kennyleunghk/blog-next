import { FC } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/index';

import Layout from '../components/layout';
import '../styles/globals.css';
import { NextPage } from 'next';

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
