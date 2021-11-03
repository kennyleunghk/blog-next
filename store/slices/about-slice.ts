import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  picture: '',
  markdownData: '',
  tempMarkdownData: '',
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    getAboutMe: (
      state,
      action: PayloadAction<{ Picture: string; Describes: string }>
    ) => {
      const { Picture, Describes } = action.payload;
      state.picture = Picture;
      state.markdownData = Describes;
    },
    setPicture: (state, action: PayloadAction<string>) => {
      state.picture = action.payload;
    },
    setMarkdownData: (state, action: PayloadAction<string>) => {
      state.markdownData = action.payload;
    },
  },
});

export const aboutActions = aboutSlice.actions;

export default aboutSlice.reducer;
