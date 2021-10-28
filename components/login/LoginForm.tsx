import React, {
  FC,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  SyntheticEvent,
  FormEvent,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import md5 from 'md5';
import { rootState } from '../../store';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

interface LoginFormData {
  UserId: string;
  Password: string;
}

const LoginForm: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const button = useRef();
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [data, setData] = useState<LoginFormData>({
    UserId: '',
    Password: '',
  });

  useEffect(() => {
    if (data.UserId.length !== 0 && data.Password.length !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (isLoggedIn === true) router.push('/');
  }, [isLoggedIn]);

  const setId = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      UserId: e.target.value,
    });
    // setError({ msg: undefined });
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

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log('submit');
  };

  // const submitHandler = async (event) => {
  //   event.preventDefault();
  //   const result = axios
  //     .post(URL + 'api/user/login', loginForm)
  //     .catch((err) => {
  //       console.log(err);
  //       setError({ msg: 'UserId or Passowrd is incorrect!' });
  //     });

  //   await result.then((res) => {
  //     if (res !== undefined) {
  //       setAuth(res.data);
  //       localStorage.setItem('token', 'Bearer ' + res.data.token);
  //     }
  //   });
  // };

  return (
    <Box component='form'>
      <TextField
        variant='outlined'
        margin='normal'
        id='id'
        fullWidth
        label='Login ID'
        autoFocus
        value={data.UserId}
        onChange={setId}
        required
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        label='Password'
        type='password'
        id='password'
        value={data.Password}
        onChange={setPassword}
      />
      <Button
        ref={button}
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        onClick={submitHandler}
        disabled={disabled}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;
