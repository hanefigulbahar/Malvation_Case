import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/usersSlice";
import autUserSlice from "../features/autUserSlice";
import selecredUserSlice from "../features/selecredUserSlice";

const store = configureStore({
  reducer: {
    allData: usersSlice,
    autUser: autUserSlice,
    selectedUser: selecredUserSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
