import React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '../../store/slices/auth-slice';
import { rootState } from '../../store';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircle from '@mui/icons-material/AccountCircle';

const IconsBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state: rootState) => state.auth.isLoggedIn);

  const logoff = () => {
    dispatch(authActions.logout());
    router.push('/Login');
  };

  return (
    <Stack direction='row' spacing={0}>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        color='inherit'
        onClick={() =>
          window.open('https://gitlab.com/users/kennycha87/projects')
        }
      >
        <GitHubIcon />
      </IconButton>

      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        color='inherit'
        onClick={() => router.push('/About')}
      >
        <InfoIcon />
      </IconButton>

      {isLoggedIn ? (
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
          onClick={logoff}
        >
          <ExitToAppIcon>Log off</ExitToAppIcon>
        </IconButton>
      ) : (
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
          onClick={() => router.push('/Login')}
        >
          <AccountCircle />
        </IconButton>
      )}
    </Stack>
  );
};

export default IconsBar;
