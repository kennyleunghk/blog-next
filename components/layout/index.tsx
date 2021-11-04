import { useSelector, useDispatch } from 'react-redux';
import { FC, useEffect } from 'react';
import Header from '../header';
import Footer from '../footer';
import { Container, Box, Paper, Alert, AlertProps } from '@mui/material';
import { rootState } from '../../store';
import { messageActions } from '../../store/slices/message-slice';

const texts = `asdsdasd asd asdqwpoei qwer qewrf aopsd osper woedfiospadjf
  WERHIOJOIASD0FJ QWOE JQSDOA SDIQPOWRIWPOERF OSkdjFOIWRG
  EORTGJPDOSFJGPIO asdsdasd asd asdqwpoei qwer qewrf aopsd osper
  woedfiospadjf WERHIOJOIASD0FJ QWOE JQSDOA SDIQPOWRIWPOERF OSkdjFOIWRG
  EORTGJPDOSFJGPIO asdsdasd asd asdqwpoei qwer qewrf aopsd osper
  woedfiospadjf WERHIOJOIASD0FJ QWOE JQSDOA SDIQPOWRIWPOERF OSkdjFOIWRG
  EORTGJPDOSFJGPIO asdsdasd asd asdqwpoei qwer qewrf aopsd osper
  woedfiospadjf WERHIOJOIASD0FJ QWOE JQSDOA SDIQPOWRIWPOERF OSkdjFOIWRG
  EORTGJPDOSFJGPIO`;

const Layout: FC = ({ children }) => {
  const message = useSelector((state: rootState) => state.message);
  const dispatch = useDispatch();
  const alertType = {
    severity: message.type,
    sx: { display: 'flex', justifyContent: 'center' },
  } as AlertProps;

  useEffect(() => {
    if (message.msg !== null) {
      setTimeout(() => {
        dispatch(messageActions.clearMessage());
      }, 10000);
    }
  }, [message]);

  return (
    <Box minHeight='100vh' bgcolor='#F0F0F0'>
      <Header />
      <Container component='div' maxWidth='lg' sx={{ paddingBottom: 10 }}>
        <Box
          sx={{
            minHeight: 30,
            maxHeight: 48,
            marginTop: '0.5rem',
            alignItems: 'center',
          }}>
          {message.type !== null && (
            <Alert {...alertType}>{message.msg.substring(0, 100)}</Alert>
          )}
        </Box>
        <Paper sx={{ minHeight: 700, marginTop: 1, padding: '1rem 1rem' }}>
          {children}
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
