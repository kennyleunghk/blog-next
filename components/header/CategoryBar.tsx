import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar } from '@mui/material';
import { rootState } from '../../store';
import { CategoryModel } from '../../models/CategoryModel';

import classes from '../../styles/layout/CategoryBar.module.css';

const CategoryBar = () => {
  const router = useRouter();
  const categories: CategoryModel[] | any = useSelector(
    (state: rootState) => state.posts.categories,
  );
  return (
    <Toolbar
      component='nav'
      variant='dense'
      className={classes.categories_toolbar}>
      {categories.map((section: string | any, index: number | any) => (
        <div
          className={classes.toolbarLink}
          onClick={() => router.push(`/${section.name}`)}>
          <Link key={index} href={'/' + section.name}>
            {section.name}
          </Link>
        </div>
      ))}
    </Toolbar>
  );
};

export default CategoryBar;
