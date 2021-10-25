import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  categories: [],
};

const postSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    getPost(state, action: PayloadAction<PostModel[]>) {
      this.state.posts = action.payload;
    },
    increment(state, action: PayloadAction) {},
  },
});

export const counterActions = postSlice.actions;

export default postSlice.reducer;
