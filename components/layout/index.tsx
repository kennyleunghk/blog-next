import { AppProps } from 'next/app';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import { styled } from '@mui/styles';
import Header from '../header';
import Footer from '../footer';
import { Container, Box, Alert, AlertProps, Typography } from '@mui/material';
import { rootState } from '../../store';

const Layout: FC = ({ children }) => {
  const texts = `asdsdasd asd asdqwpoei qwer qewrf aopsd osper woedfiospadjf
  WERHIOJOIASD0FJ QWOE JQSDOA SDIQPOWRIWPOERF OSkdjFOIWRG
  EORTGJPDOSFJGPIO asdsdasd asd asdqwpoei qwer qewrf aopsd osper
  woedfiospadjf WERHIOJOIASD0FJ QWOE JQSDOA SDIQPOWRIWPOERF OSkdjFOIWRG
  EORTGJPDOSFJGPIO asdsdasd asd asdqwpoei qwer qewrf aopsd osper
  woedfiospadjf WERHIOJOIASD0FJ QWOE JQSDOA SDIQPOWRIWPOERF OSkdjFOIWRG
  EORTGJPDOSFJGPIO asdsdasd asd asdqwpoei qwer qewrf aopsd osper
  woedfiospadjf WERHIOJOIASD0FJ QWOE JQSDOA SDIQPOWRIWPOERF OSkdjFOIWRG
  EORTGJPDOSFJGPIO`;
  const message = useSelector((state: rootState) => state.message);

  const alertType = {
    severity: message.type,
  } as AlertProps;

  return (
    <>
      <Header />
      <Container component='div' maxWidth='lg'>
        <Box
          sx={{
            minHeight: 30,
            maxHeight: 30,
            marginTop: 1,
          }}
        >
          {message.type !== null && (
            <Alert {...alertType}>{texts.substr(0, 100)}</Alert>
          )}
        </Box>
        <Box sx={{ marginTop: 1 }}>{children}</Box>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
