import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SelectedUser, User } from "../types/users";

const initialState: SelectedUser = {
  user: null,
};

const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export default selectedUserSlice.reducer;
export const { updateUser } = selectedUserSlice.actions;
