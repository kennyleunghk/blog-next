import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import Link from '@mui/material/Link';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import SearchField from './SearchField';
import IconsBar from './IconsBar';
import { rootState } from '../../store';

const HeaderBar: FC = () => {
  const isLiggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);
  const router = useRouter();
  return (
    <>
      <AppBar position='static' color='secondary' style={{ boxShadow: 'none' }}>
        <Toolbar>
          {isLiggedIn && (
            <Button
              variant='contained'
              size='small'
              sx={{
                marginRight: 2,
              }}
              onClick={() => router.push('NewPost')}
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
      </AppBar>
    </>
  );
};

export default HeaderBar;
