import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './slices/post-slice';
import authReducer from './slices/auth-slice';
import postReducer from './slices/post-slice';
import aboutReducer from './slices/about-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    about: aboutReducer,
  },
});

export type rootState = ReturnType<typeof store.getState>;

export default store;
