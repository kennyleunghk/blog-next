import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  type: string | null;
  msg: string | null;
}

const initialState = {
  msg: 'success message',
  type: 'success',
} as InitialState;

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.type = 'error';
      state.msg = action.payload;
    },
    setWarning: (state, action: PayloadAction<string>) => {
      state.type = 'warning';
      state.msg = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.type = 'success';
      state.msg = action.payload;
    },
  },
});

export const messageActions = messageSlice.actions;

export default messageSlice.reducer;
