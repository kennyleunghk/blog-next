import React, {
  FC,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
  FocusEvent,
} from 'react';
import jwt, { JwtPayload, Jwt } from 'jsonwebtoken';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useHttp } from '../../hooks/useHttp';
import md5 from 'md5';
import { rootState } from '../../store';
import { BACKEND } from '../../config';

import Box from '@mui/material/Box';
import { Divider, TextField, Button, TextFieldProps } from '@mui/material';

import { authActions } from '../../store/slices/auth-slice';

interface LoginFormData {
  UserId: string;
  Password: string;
}

const InputProps: TextFieldProps = {
  margin: 'normal',
  fullWidth: true,
  required: true,
  size: 'small',
};

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

  const setId = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      UserId: e.target.value,
    });
    // setError({ msg: undefined });
  };

  const firstInputHandler = () => {
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
    const result = await useHttp('post', `${BACKEND}/user/login`, {
      body: { ...data, Password: md5(data.Password) },
    });
    if (result) {
      // redirect to index page
      router.push('/');
      // set token to localStorage
      await localStorage.setItem('token', result.data.token);
      // set state
      await dispatch(authActions.loggedIn());

      // decode token to count the auto logout seconds
      const praseToken: JwtPayload = jwt.decode(result.data.token, {
        complete: true,
      }).payload;

      // // count the seconds
      const logoutTime = praseToken.exp - praseToken.iat;

      // // set timeout to logout
      setTimeout(() => {
        dispatch(authActions.logout());
      }, logoutTime * 1000);
    }
  };

  return (
    <Box component='form' autoComplete='off' onSubmit={submitHandler}>
      <TextField
        {...InputProps}
        error={invalidId}
        label='Login ID'
        value={data.UserId}
        onChange={setId}
        onFocus={() => {
          !touch && firstInputHandler();
        }}
      />
      <TextField
        {...InputProps}
        error={invalidPassword}
        variant='outlined'
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
        size='small'
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
