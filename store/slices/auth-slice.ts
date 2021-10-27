import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: true,
  profile: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
