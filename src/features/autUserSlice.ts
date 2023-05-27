import { createSlice } from "@reduxjs/toolkit";

const localUser = window.localStorage.getItem("user") || null;
const localUserStatus =
  window.localStorage.getItem("status") || "false" || null;

interface User {
  user: {
    localUser: string | null;
  };
  isAut: string | null;
}

const initialState: User = {
  user: {
    localUser,
  },
  isAut: localUserStatus,
};

const autUserSlice = createSlice({
  name: "autUser",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAut = "true";
    },
    userAutStatus: (state, action) => {
      state.isAut = action.payload;
    },
  },
});

export default autUserSlice.reducer;
export const { loginUser, userAutStatus } = autUserSlice.actions;
