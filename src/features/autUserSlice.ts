import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "../types/users";

const storeUser: string | null = window.localStorage.getItem("user");

const parsingStoreUser = storeUser ? JSON.parse(storeUser) : null;

const initialState: AuthUser = {
  accessToken: parsingStoreUser?.accessToken,
  user: parsingStoreUser?.user,
};

const autUserSlice = createSlice({
  name: "autUser",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      window.localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export default autUserSlice.reducer;
export const { loginUser } = autUserSlice.actions;
