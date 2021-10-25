import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { Toolbar } from '@mui/material';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../Store/Auth/auth-actions';
import { NextPage } from 'next';
import { AppInitialProps, AppProps } from 'next/app';

const useStyles = makeStyles(() => ({
  toolbar: {
    //   borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: '30px',
  },
  toolbarTitleLink: {
    fontFamily: 'Gill Sans", sans-serif',
    fontWeight: 'bold',
    color: 'black',
    '&:hover': {
      fontWeight: 'bold',
      textDecoration: 'none',
      color: 'black',
    },
  },
  toolbarTools: {
    position: 'absolute',
    right: '20px',
  },
  toolbarSecondary: {
    overflowX: 'auto',
    display: 'flex',
  },
  toolbarLink: {
    flex: 1,
    fontWeight: 400,
    fontSize: '1.2rem',
    textAlign: 'center',
    backgroundColor: '#4A4A4A',
    color: 'white',
    padding: '10px 10px',

    '&:hover': {
      backgroundColor: '#FFC250',
      fontWeight: 'bold',
      textDecoration: 'none',
      color: '#007391',
    },
    '&:active': {
      backgroundColor: '#FFC250',
    },
  },
  newPost: {
    backgroundColor: '#06FF9B',
    border: '2px solid',
    fontSize: '15px',
    color: 'white',
    fontWeight: 'bold',
    padding: '10px 10px',
    borderRadius: '10px',
    '&:hover': {
      fontWeight: 'bold',
      border: '2px solid #AEAEAE',
      textDecoration: 'none',
      color: '#007391',
    },
  },
}));

interface Props {
  logout: () => void;
}

const Header: NextPage<Props> = ({ logout }) => {
  const classes = useStyles();
  const router = useRouter();
  const logoff = () => {
    logout();
    router.push('/login');
  };

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        {/* show Create Post button if logged in */}
        {auth.isLogin ? (
          <Link to='/Publish'>
            <Button variant='contained' color='primary'>
              New Post
            </Button>{' '}
          </Link>
        ) : (
          ''
        )}
        <Typography
          component='h2'
          variant='h5'
          color='inherit'
          align='center'
          noWrap
          className={classes.toolbarTitle}>
          <Link to='/' className={classes.toolbarTitleLink}>
            Kenny Leung's Technical Blog
          </Link>
        </Typography>
        <div className={classes.toolbarTools}>
          <IconButton onClick={() => history.push('/Search')}>
            <SearchIcon />
          </IconButton>
          <IconButton href='https://gitlab.com/users/kennycha87/projects'>
            <GitHubIcon />
          </IconButton>
          <IconButton onClick={() => history.push('/about')}>
            <InfoIcon />
          </IconButton>
          {auth.isLogin ? (
            <IconButton onClick={logoff}>
              <ExitToAppIcon>Log off</ExitToAppIcon>
            </IconButton>
          ) : (
            <Link to='/login'>
              <Button size='small'>Login</Button>
            </Link>
          )}
        </div>
      </Toolbar>
      <Toolbar
        component='nav'
        variant='dense'
        style={{ display: 'flex', padding: '0 0 0 0' }}>
        {categories.map((section, index) => (
          <Link
            color='inherit'
            noWrap
            key={index}
            to={'/' + section.name}
            id={section.name}
            className={classes.toolbarLink}>
            {section.name}
          </Link>
        ))}
      </Toolbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  categories: state.post.categories,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
