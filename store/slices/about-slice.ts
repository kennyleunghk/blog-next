import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  picture: "",
  uploadPicture: "",
  mdData: "",
};

const aboutSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const aboutActions = aboutSlice.actions;

export default aboutSlice.reducer;
