import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  picture: '',
  uploadPicture: '',
  mdData: '',
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
});

export const aboutActions = aboutSlice.actions;

export default aboutSlice.reducer;
