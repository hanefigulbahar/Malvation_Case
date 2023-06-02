import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: true,
};
const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default loadingSlice.reducer;
export const { isLoading } = loadingSlice.actions;
