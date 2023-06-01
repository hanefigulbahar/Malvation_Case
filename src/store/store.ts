import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/usersSlice";
import autUserSlice from "../features/autUserSlice";
import selecredUserSlice from "../features/selecredUserSlice";
import themeSlice from "../features/themeSlice";
import paginationSlice from "../features/paginationSlice";

const store = configureStore({
  reducer: {
    allData: usersSlice,
    autUser: autUserSlice,
    selectedUser: selecredUserSlice,
    theme: themeSlice,
    pagination: paginationSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
