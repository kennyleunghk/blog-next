import React, {
  FC,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
  FocusEvent,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useHttp } from '../../hooks/useHttp';
import md5 from 'md5';
import { rootState } from '../../store';

import Box from '@mui/material/Box';
import { Divider, TextField, Button } from '@mui/material';

import { authActions } from '../../store/slices/auth-slice';

interface LoginFormData {
  UserId: string;
  Password: string;
}

const LoginForm: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const button = useRef();
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const [data, setData] = useState<LoginFormData>({
    UserId: '',
    Password: '',
  });
  const [invalidId, setInvalidId] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [touch, setTouch] = useState<boolean>(false);

  useEffect(() => {
    if (data.UserId.trim().length === 0 && touch === true) {
      setInvalidId(true);
    } else {
      setInvalidId(false);
    }

    if (data.Password.trim().length === 0 && touch === true) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }
  }, [data]);

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn === true) {
      router.push('/');
    }
  }, [isLoggedIn]);

  const setId = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      UserId: e.target.value,
    });
    // setError({ msg: undefined });
  };

  const firstInputHandler = () => {
    console.log('executed');
    setTouch(true);
  };

  const setPassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value.length === 0
      ? setData({
          ...data,
          Password: '',
        })
      : setData({
          ...data,
          Password: e.target.value,
        });
    // setError({ msg: undefined });
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    console.log('prevent default');
    const result = await useHttp(
      'post',
      'http://kennyleung-blog.sytes.net:9321/api/user/login',
      { ...data, Password: md5(data.Password) }
    );
    if (result) {
      console.log('result');
      await localStorage.setItem('token', result.token);
      console.log(localStorage.getItem('token'));
      await dispatch(authActions.loggedIn());
    }
  };

  return (
    <Box component='form' autoComplete='off' onSubmit={submitHandler}>
      <TextField
        error={invalidId}
        margin='normal'
        fullWidth
        label='Login ID'
        value={data.UserId}
        onChange={setId}
        required
        onFocus={() => {
          !touch && firstInputHandler();
        }}
      />
      <TextField
        error={invalidPassword}
        variant='outlined'
        margin='normal'
        required
        fullWidth
        label='Password'
        type='password'
        value={data.Password}
        onChange={setPassword}
        onFocus={() => {
          !touch && firstInputHandler();
        }}
      />
      <Button
        ref={button}
        type='submit'
        variant='contained'
        color='primary'
        sx={{ display: 'block', margin: 'auto', marginTop: 2 }}
        disabled={
          invalidPassword === false && invalidId === false ? false : true
        }
      >
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;
