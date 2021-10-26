import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  type: string;
  message: string;
}

const initialState = {
  message: '',
  type: '',
} as InitialState;

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.type = 'error';
      state.message = action.payload;
    },
    setWarning: (state, action: PayloadAction<string>) => {
      state.type = 'warning';
      state.message = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.type = 'success';
      state.message = action.payload;
    },
  },
});

export const messageActions = messageSlice.actions;

export default messageSlice.reducer;
