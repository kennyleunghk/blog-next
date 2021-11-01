import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  isLoggedIn: boolean;
}

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      console.log('slice set logut');
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
