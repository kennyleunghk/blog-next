import { AppProps } from 'next/app';
import { FC } from 'react';
import { styled } from '@mui/styles';
import Header from '../header';
import Footer from '../footer';

const Main = styled('div')(() => ({
  width: '100%',
  marginTop: '10%',
}));

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
