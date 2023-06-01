import { createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "../types/users";

const storeUser = JSON.parse(
  window.localStorage.getItem("user") || "null"
) as AuthUser;

const initialState: AuthUser = {
  accessToken: storeUser?.accessToken,
  user: storeUser?.user,
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
