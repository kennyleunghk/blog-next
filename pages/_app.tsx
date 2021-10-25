import { FC } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/index';

import '../styles/globals.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
