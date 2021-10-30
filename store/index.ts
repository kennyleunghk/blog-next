import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './slices/post-slice';
import authReducer from './slices/auth-slice';
import postReducer from './slices/post-slice';
import aboutReducer from './slices/about-slice';
import messageReducer from './slices/message-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    about: aboutReducer,
    message: messageReducer,
  },
});

export type rootState = ReturnType<typeof store.getState>;

export default store;
