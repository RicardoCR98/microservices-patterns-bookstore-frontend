import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const initialAuthState: AuthState = {
  status: "not-authenticated",
  user: null,
  token: null,
  expirationDate: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, { payload }) => {
      console.log("authenticated");
      state.status = "authenticated";
      state.user = payload.user;
      state.token = payload.token;
      state.expirationDate = payload.expirationDate;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      console.log("not-authenticated");
      state.status = "not-authenticated";
      state.token = null;
      state.user = null;
      state.expirationDate = null;
      state.errorMessage = payload?.errorMessage || null;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { login, logout, checkingCredentials, setError } =
  authSlice.actions;
