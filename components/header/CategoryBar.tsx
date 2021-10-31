import { MouseEvent, MouseEventHandler, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar } from '@mui/material';
import { rootState } from '../../store';
import { CategoryModel } from '../../models/CategoryModel';

import classes from '../../styles/layout/CategoryBar.module.css';
import { postActions } from '../../store/slices/post-slice';

const CategoryBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const categories: CategoryModel[] | any = useSelector(
    (state: rootState) => state.post.categories
  );

  const changePostsHandler = (e: MouseEvent<HTMLElement>) => {
    router.push('/');
    const value = e.currentTarget.innerHTML;
    dispatch(postActions.setShowPost(value));
  };
  return (
    <Toolbar
      component='nav'
      variant='dense'
      className={classes.categories_toolbar}
    >
      <div
        className={classes.toolbarLink}
        onClick={changePostsHandler}
        key='all'
      >
        All
      </div>
      {categories.map((section: string | any) => (
        <div
          className={classes.toolbarLink}
          key={section.id}
          onClick={changePostsHandler}
        >
          {section.name}
        </div>
      ))}
    </Toolbar>
  );
};

export default CategoryBar;
