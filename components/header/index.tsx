import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { authActions } from '../../store/slices/auth-slice';
import AppBar from './HeaderBar';
import CategoryBar from './CategoryBar';

const Header: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchInitData = async () => {
      try {
        await axios.get();
      } catch (error) {}
    };

    const storedToken = localStorage.getItem('token');
    if (storedToken !== undefined && storedToken !== null) {
      const token = storedToken.split(' ');
      const expired = jwt.decode(token[1]);

      if (expired.exp > Math.floor(Date.now() / 1000)) {
        dispatch(authActions.isLoggedIn());
      }
    }
  }, []);

  return (
    <>
      <AppBar />
      <CategoryBar />
    </>
  );
};

export default Header;
