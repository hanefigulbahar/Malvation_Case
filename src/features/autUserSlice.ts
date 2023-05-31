import { createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "../types/users";

const { user } = JSON.parse(
  window.localStorage.getItem("user") || ""
) as AuthUser;

const initialState: AuthUser = {
  user: {
    accessToken: user.accessToken,
    user: user.user,
  },
};

const autUserSlice = createSlice({
  name: "autUser",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      window.localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export default autUserSlice.reducer;
export const { loginUser } = autUserSlice.actions;
