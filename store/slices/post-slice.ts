import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryModel } from "../../models/CategoryModel";
import { PostModel } from "../../models/Posts";

class InitialState {
  posts: PostModel[] | undefined;
  categories: CategoryModel[] | undefined;
}

const initialState = {
  posts: [],
  categories: [],
} as InitialState;

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPost: (state, action: PayloadAction<PostModel[]>) => {
      state.posts = action.payload;
    },
    setCategories: (state, action: PayloadAction<CategoryModel[]>) => {
      console.log("get");
      state.categories = action.payload;
      console.log("finished");
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
