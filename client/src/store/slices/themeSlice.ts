import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    currrentTheme: "light",
  },
  reducers: {
    toggleTheme: (state) => {
      state.currrentTheme = state.currrentTheme === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.currrentTheme = action.payload;
    },
  },
});

export const  {toggleTheme, setTheme} = themeSlice.actions

export default themeSlice.reducer