import { createSlice } from "@reduxjs/toolkit";

interface IPage {
  page: number;
}

const initialState: IPage = {
  page: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    updatePage: (state, action) => {
      state.page = action.payload;

      localStorage.setItem("page", state.page.toLocaleString());
    },
  },
});

export default paginationSlice.reducer;
export const { updatePage } = paginationSlice.actions;
