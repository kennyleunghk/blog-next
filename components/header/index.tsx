import React, { FC, useEffect } from 'react';
import { useHttp } from '../../hooks/useHttp';
import { useDispatch, useSelector } from 'react-redux';
import jwt, { DecodeOptions, Jwt, JwtPayload } from 'jsonwebtoken';
import { authActions } from '../../store/slices/auth-slice';
import { postActions } from '../../store/slices/post-slice';
import { aboutActions } from '../../store/slices/about-slice';
import { styled, alpha } from '@mui/material/styles';
import HeaderBar from './HeaderBar';
import CategoryBar from './CategoryBar';
import { CategoryModel } from '../../models/CategoryModel';
import { rootState } from '../../store';
import { BACKEND } from '../../config';
import { AppProps } from 'next/dist/shared/lib/router/router';

const Head = styled('div')(({ theme }) => ({
  width: '100%',
}));

const Header: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchInitData();
    checkLogin();
  }, []);

  async function fetchInitData() {
    try {
      const categories: any = await useHttp(
        'get',
        `${BACKEND}/LoadData/categories`,
        null
      );
      if (categories) {
        dispatch(postActions.setCategories(categories));
      }

      const posts: any = await useHttp(
        'get',
        `${BACKEND}/LoadData/Posts`,
        null
      );
      if (posts) {
        dispatch(postActions.getPost(posts));
      }

      const about: any = await useHttp(
        'get',
        `${BACKEND}/LoadData/AboutMe`,
        null
      );
      if (about) {
        dispatch(aboutActions.getAboutMe(about[0]));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function checkLogin() {
    // get the token
    const token: Jwt = jwt.decode(localStorage.getItem('token'), {
      complete: true,
    });
    // if token available
    if (token) {
      // set auth
      dispatch(authActions.loggedIn());
      // get the current time and change it to number format
      const currentTime = new Date().valueOf();
      // count the differency
      const logoutTime = token.payload.exp * 1000 - currentTime;

      // set timeout to logout
      setTimeout(() => {
        dispatch(authActions.logout());
      }, logoutTime);
    }
  }

  return (
    <Head>
      <HeaderBar />
      <CategoryBar />
    </Head>
  );
};

export default Header;
