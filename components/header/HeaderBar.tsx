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
      <AppBar position='static' color='secondary' style={{ boxShadow: 'none' }}>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Kenny Leung Blog
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
