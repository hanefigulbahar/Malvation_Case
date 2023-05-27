import { createSlice } from "@reduxjs/toolkit";
import { Welcome } from "../types/users";

const initialState: Welcome = {
  users: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    allData: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { allData } = usersSlice.actions;
