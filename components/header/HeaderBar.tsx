import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import Link from '@mui/material/Link';
import CategoryBar from './CategoryBar';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import SearchField from './SearchField';
import IconsBar from './IconsBar';
import { rootState } from '../../store';
import { postActions } from '../../store/slices/post-slice';
import { Category } from '@mui/icons-material';

const HeaderBar: FC = () => {
  const dispatch = useDispatch();
  const isLiggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const edit = useSelector((state: rootState) => state.post.edit);
  const router = useRouter();
  const newPostHandler = async () => {
    if (edit === true) {
      await dispatch(postActions.setEdit());
    }
    await router.push('/NewPost');
  };
  return (
    <>
      <AppBar position='fixed' color='secondary' style={{ boxShadow: 'none' }}>
        <Toolbar>
          {isLiggedIn && (
            <Button
              variant='contained'
              size='small'
              sx={{
                marginRight: 2,
              }}
              onClick={newPostHandler}
            >
              New
            </Button>
          )}
          <Typography
            variant='h5'
            noWrap
            component='div'
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Link href='/'>Kenny Blog</Link>
          </Typography>

          {/* search field */}
          <SearchField />
          <IconsBar />
        </Toolbar>
        <CategoryBar />
      </AppBar>
    </>
  );
};

export default HeaderBar;
