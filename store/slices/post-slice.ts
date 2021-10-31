import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryModel } from '../../models/CategoryModel';
import { PostModel } from '../../models/PostModel';

class InitialState {
  posts: PostModel[] | undefined;
  showPosts: PostModel[] | undefined;
  categories: CategoryModel[] | undefined;
}

const initialState = {
  posts: [],
  showPosts: [],
  categories: [],
} as InitialState;

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPost: (state, action: PayloadAction<PostModel[]>) => {
      state.showPosts = action.payload;
      state.posts = action.payload;
    },
    setShowPost: (state, action: PayloadAction<string>) => {
      if (action.payload === 'All') {
        state.showPosts = state.posts;
      } else {
        state.showPosts = state.posts.filter(
          (post: PostModel) => post.Category === action.payload
        );
      }
    },
    searchPost: (state, action: PayloadAction<string>) => {
      const searchInput = action.payload;
      state.showPosts = state.posts.filter((post: PostModel) => {
        if (
          post.Contents.toLowerCase().includes(
            searchInput.trim().toLowerCase()
          ) ||
          post.Category.toLowerCase().includes(
            searchInput.trim().toLowerCase()
          ) ||
          post.Description.toLowerCase().includes(
            searchInput.trim().toLowerCase()
          ) ||
          post.Title.toLowerCase().includes(searchInput.trim().toLowerCase()) ||
          post.Tags.toLowerCase().includes(searchInput.trim().toLowerCase())
        ) {
          return post;
        }
      });
    },
    setCategories: (state, action: PayloadAction<CategoryModel[]>) => {
      state.categories = action.payload;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
