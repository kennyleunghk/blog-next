import { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import SearchField from './SearchField';
import IconsBar from './IconsBar';

const HeaderBar: FC = () => {
  return (
    <>
      <AppBar position='static' color='transparent'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            MUI
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
