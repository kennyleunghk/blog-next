import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  profile: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = true;
    },
  },
});
