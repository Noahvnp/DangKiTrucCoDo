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
    // // delete user
    // deleteUserStart: (state) => {
    //     state.users.isFetching = true;
    // },
    // deleteUserSuccess: (state, action) => {
    //     state.users.isFetching = false;
    //     state.msg = action.payload;
    // },
    // deleteUserFailure: (state, action) => {
    //     state.users.isFetching = false;
    //     state.users.error = true;
    //     state.msg = action.payload;
    // }
  },
});

export const {
  getRegisteredListStart,
  getRegisteredListSuccess,
  getRegisteredListFailure,
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
} = registeredUserSlice.actions;

export default registeredUserSlice.reducer;
