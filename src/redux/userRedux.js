import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      console.log("Loggin out");
      state.currentUser = null;
    },
    uploadStart: (state) => {
      state.isFetching = true;
    },
    uploadFinish: (state) => {
      state.isFetching = false;
    },

    changePhoto: (state, action) => {
      console.log("Photo", action.payload);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
  changePhoto,
  uploadStart,
  uploadFinish,
} = userSlice.actions;
export default userSlice.reducer;
