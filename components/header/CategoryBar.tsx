import { MouseEvent, MouseEventHandler, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Box, BoxProps } from '@mui/material';
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

  // .categories_toolbar {
  //   display: flex;
  //   padding: 0rem 0rem;
  //   position: static;
  //   min-height: 0;
  //   font-size: 0.7rem;
  // }

  // .toolbarLink:hover {
  //   background-color: #ffc250;
  //   font-weight: bold;
  //   text-decoration: none;
  //   color: #007391;
  //   cursor: pointer;
  // }
  const [hover, setHover] = useState(false);

  const [sx, setSx] = useState<BoxProps>({
    color: 'white',
    bgcolor: '#525252',
    width: '100%',
    textAlign: 'center',
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  });

  const categoryBarProps = {
    sx,
    onClick: changePostsHandler,
    onMouseOver: (e) => hoverHander(e),
    onMouseLeave: (e) => hoverHander(e),
  };

  const hoverHander = (e) => {
    e.stopPropagation();
    switch (e.type) {
      case 'mouseover': {
        e.currentTarget.style.backgroundColor = '#ff9800';
        break;
      }
      case 'mouseleave': {
        e.currentTarget.style.backgroundColor = '#525252';
        e.currentTarget.style.color = 'white';
        break;
      }
      default:
        return;
    }
  };

  return (
    <Toolbar
      disableGutters
      variant='dense'
      sx={{
        display: 'flex',
        position: 'static',
        justifyContent: 'space-around',
        bgcolor: 'white',
      }}
    >
      <Box
        onClick={changePostsHandler}
        key='all'
        style={{
          cursor: 'pointer',
        }}
        {...categoryBarProps}
      >
        All
      </Box>
      {categories.map((section: string | any) => (
        <Box
          id={section.id}
          key={section.id}
          {...categoryBarProps}
          style={{
            cursor: 'pointer',
          }}
        >
          {section.name}
        </Box>
      ))}
    </Toolbar>
  );
};

export default CategoryBar;
