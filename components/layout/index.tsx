import { AppProps } from 'next/app';
import { FC } from 'react';
import { styled } from '@mui/styles';
import Header from '../header';
import Footer from '../footer';

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ marginTop: '20px' }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
