import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Theme } from "../types/theme";

const theme = localStorage.getItem("theme") as Theme;

interface IThema {
  theme: Theme;
}
const initialState: IThema = {
  theme: theme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<boolean>) => {
      action.payload === true
        ? (state.theme = Theme.dark)
        : (state.theme = Theme.light);
      if (state.theme === Theme.dark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", state.theme);
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.removeItem("theme");
      }
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
