import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryModel } from '../../models/CategoryModel';
import { PostModel } from '../../models/PostModel';

class InitialState {
  posts: PostModel[] | undefined;
  categories: CategoryModel[] | undefined;
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
      console.log('get post');
      state.posts = action.payload;
      console.log(state.posts);
    },
    setCategories: (state, action: PayloadAction<CategoryModel[]>) => {
      state.categories = action.payload;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
