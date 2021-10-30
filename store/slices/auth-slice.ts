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
      console.log('dispat reducer');
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
