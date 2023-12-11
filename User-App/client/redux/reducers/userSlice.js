import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    signupAttempt: undefined,
    loginAttempt: undefined,
    currentUser: {},
  },
  reducers: {
    signupCurrentUser: (state, action) => {
      state.signupAttempt = true;
      state.isLoggedIn = true;
      state.currentUser = action.userInfo;
    },
    failedSignup: (state, action) => {
      state.signupAttempt = false;
    },
    loginCurrentUser: (state, action) => {
      state.loginAttempt = true;
      state.isLoggedIn = true;
      state.currentUser = action.userInfo;
    },
    failedLogin: (state, action) => {
      state.loginAttempt = false;
    },
    logOut: (state, action) => {
      state.isLoggedIn = false;
      state.signupAttempt = undefined;
      state.loginAttempt = undefined;
      state.currentUser = {};
    }
  },
});

export const { signupCurrentUser, failedSignup, loginCurrentUser, failedLogin, logOut } = userSlice.actions;

export default userSlice.reducer;
