import { RssFeed } from '@mui/icons-material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  isLoggedIn: boolean;
}

const initialState = {
  isLoggedIn: false,
  user: {
    usename: '',
    password: '',
    userId: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
    autoLogout: (state, action: PayloadAction<number>) => {},
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
