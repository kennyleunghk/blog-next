import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './slices/counter-slice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type rootState = ReturnType<typeof store.getState>;

export default store;
