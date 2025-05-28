import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QueryState {
  query: string;
}

const initialState: QueryState = {
  query: '',
};

const localStorageSlice = createSlice({
  name: 'localStorage',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = localStorageSlice.actions;
export default localStorageSlice.reducer;