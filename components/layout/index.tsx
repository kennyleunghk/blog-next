import { useSelector, useDispatch } from 'react-redux';
import { FC, useEffect } from 'react';
import Header from '../header';
import Footer from '../footer';
import { Container, Box, Paper, Alert, AlertProps } from '@mui/material';
import { rootState } from '../../store';
import { messageActions } from '../../store/slices/message-slice';

const Layout: FC = ({ children }) => {
  const message = useSelector((state: rootState) => state.message);
  const dispatch = useDispatch();
  const alertType = {
    variant: 'filled',
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
    <Box bgcolor='#F5F5F5'>
      <Header />
      <Container
        component='div'
        maxWidth='lg'
        sx={{ paddingBottom: 7, paddingTop: '7.2rem' }}
      >
        {message.type !== null && (
          <Box
            sx={{
              minHeight: 30,
              maxHeight: 48,
              alignItems: 'center',
            }}
          >
            <Alert {...alertType}>{message.msg.substring(0, 100)}</Alert>
          </Box>
        )}
        <Paper sx={{ minHeight: 740, marginTop: 1, padding: '1rem 1rem' }}>
          {children}
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
