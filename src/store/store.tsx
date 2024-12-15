import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { configSlice } from "./config";
import { loadFromLocalStorage, saveToLocalStorage } from "@utils/LocalStorageUtil";
import { AuthState } from "./auth/types";
import { DefaultConfigProps } from "src/types/config";

export interface RootState {
  auth: AuthState;
  config: DefaultConfigProps;
}

const preloadedState = loadFromLocalStorage<RootState>();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    config: configSlice.reducer,
  },
  preloadedState
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type AppDispatch = typeof store.dispatch;