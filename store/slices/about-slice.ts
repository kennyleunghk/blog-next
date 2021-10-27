import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  picture: '',
  markdownData: '',
  tempPicture: '',
  tempMarkdownData: '',
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    getAboutMe: (
      state,
      action: PayloadAction<{ Picture: string; Describes: string }>,
    ) => {
      const { Picture, Describes } = action.payload;
      state.picture = Picture;
      state.markdownData = Describes;
    },
  },
});

export const aboutActions = aboutSlice.actions;

export default aboutSlice.reducer;
