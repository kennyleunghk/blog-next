import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  posts: PostModel[];
  categories: CategoryModel[];
}

const initialState = {
  posts: [],
  categories: [],
} as InitialState;

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPost: (state, action: PayloadAction<PostModel[]>) => {
      state.posts = action.payload;
    },
    increment(state, action: PayloadAction) {},
  },
});

export const counterActions = postSlice.actions;

export default postSlice.reducer;
