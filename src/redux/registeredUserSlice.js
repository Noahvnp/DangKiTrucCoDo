import { createSlice } from "@reduxjs/toolkit";

const registeredUserSlice = createSlice({
  name: "registeredUser",
  initialState: {
    registerUser: {
      isFetching: false,
      error: false,
      success: false,
    },
    registeredList: {
      allRegisteredList: null,
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    // RegisterUser
    registerUserStart: (state) => {
      state.registerUser.isFetching = true;
    },
    registerUserSuccess: (state, action) => {
      state.registerUser.isFetching = false;
      state.registerUser.error = false;
      state.registerUser.success = true;
    },
    registerUserFailure: (state) => {
      state.registerUser.isFetching = false;
      state.registerUser.error = true;
      state.registerUser.success = false;
    },
    // get all users
    getRegisteredListStart: (state) => {
      state.registeredList.isFetching = true;
    },
    getRegisteredListSuccess: (state, action) => {
      state.registeredList.isFetching = false;
      state.registeredList.allRegisteredList = action.payload;
    },
    getRegisteredListFailure: (state) => {
      state.registeredList.isFetching = false;
      state.registeredList.error = true;
    },
    // delete user
    deleteStart: (state) => {
      state.registerUser.isFetching = true;
    },
    deleteSuccess: (state, action) => {
      state.registerUser.isFetching = false;
      state.msg = action.payload;
    },
    deleteFailure: (state, action) => {
      state.registerUser.isFetching = false;
      state.registerUser.error = true;
      state.msg = action.payload;
    },
  },
});

export const {
  getRegisteredListStart,
  getRegisteredListSuccess,
  getRegisteredListFailure,
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
} = registeredUserSlice.actions;

export default registeredUserSlice.reducer;
