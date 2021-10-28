import React, { FC, useEffect } from 'react';
import { useHttp } from '../../hooks/useHttp';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import { authActions } from '../../store/slices/auth-slice';
import { postActions } from '../../store/slices/post-slice';
import { aboutActions } from '../../store/slices/about-slice';
import { styled, alpha } from '@mui/material/styles';
import AppBar from './HeaderBar';
import CategoryBar from './CategoryBar';
import { CategoryModel } from '../../models/CategoryModel';
import { rootState } from '../../store';

const Head = styled('div')(({ theme }) => ({
  width: '100%',
}));

const Header: FC = () => {
  const dispatch = useDispatch();
  const cates = useSelector((state: rootState) => state.post.categories);
  useEffect(() => {
    console.log(cates);
  }, [cates]);

  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const categories: any = await useHttp(
          'get',
          'http://kennyleung-blog.sytes.net:9321/api/LoadData/categories',
          null,
        );
        if (categories) {
          dispatch(postActions.setCategories(categories));
        }

        const posts: any = await useHttp(
          'get',
          'http://kennyleung-blog.sytes.net:9321/api/LoadData/Posts',
          null,
        );
        if (posts) {
          dispatch(postActions.getPost(posts));
        }

        const about: any = await useHttp(
          'get',
          'http://kennyleung-blog.sytes.net:9321/api/LoadData/AboutMe',
          null,
        );
        console.log(about);
        if (about) {
          dispatch(aboutActions.getAboutMe(about[0]));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchInitData();

    // const storedToken: any = localStorage.getItem('token');
    // if (storedToken !== undefined && storedToken !== null) {
    //   const token = storedToken.split(' ');
    //   const expired: any = jwt.decode(token[1]);
    //   if (expired) {
    //     if (expired.exp > Math.floor(Date.now() / 1000)) {
    //       dispatch(authActions.isLoggedIn());
    //     }
    //   }
    // }
  }, []);

  return (
    <Head>
      <AppBar />
      <CategoryBar />
    </Head>
  );
};

export default Header;
