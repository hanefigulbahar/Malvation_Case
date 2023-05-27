import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/usersSlice";
import autUserSlice from "../features/autUserSlice";

const store = configureStore({
  reducer: {
    allData: usersSlice,
    autUser: autUserSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
