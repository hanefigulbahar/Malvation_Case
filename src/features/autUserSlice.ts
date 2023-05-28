import { createSlice } from "@reduxjs/toolkit";

interface User {
  data: {
    user: string | null;
    isAut: boolean | null;
  };
}
const localUser = window.localStorage.getItem("user");
const localStatus = JSON.parse(window.localStorage.getItem("user") || "false");
const initialState: User = {
  data: {
    user: localUser,
    isAut: localStatus ? localStatus.isAut : false,
  },
};

const autUserSlice = createSlice({
  name: "autUser",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.data.user = action.payload;
      state.data.isAut = true;
      window.localStorage.setItem("user", JSON.stringify(state.data));
    },
  },
});

export default autUserSlice.reducer;
export const { loginUser } = autUserSlice.actions;
