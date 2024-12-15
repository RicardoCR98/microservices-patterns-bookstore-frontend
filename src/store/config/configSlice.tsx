import { createSlice } from "@reduxjs/toolkit";
import { MenuOrientation, ThemeDirection, ThemeMode } from "src/config";
import { DefaultConfigProps } from "src/types/config";


const initialState:DefaultConfigProps = {
  miniDrawer: false,
  i18n: "en",
  container: true,
  menuOrientation: MenuOrientation.VERTICAL,
  mode: ThemeMode.LIGHT,
  fontFamily: `'Public Sans', sans-serif`,
  presetColor: "default",
  themeDirection: ThemeDirection.LTR,
};


export const configSlice = createSlice({
  name: "config",
  initialState: initialState,
  reducers: {
    setMiniDrawer(state, {payload}) {
      state.miniDrawer = payload;
    },
  },
});

export const { setMiniDrawer } = configSlice.actions;
