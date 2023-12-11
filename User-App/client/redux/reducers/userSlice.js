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
    //this will be dispatched if the user successfully signs up
    signupCurrentUser: (state, action) => {
      state.signupAttempt = true;
      state.isLoggedIn = true;
      state.currentUser = action.userInfo;
      console.log('Finished signupCurrentUser. ', current.state);
    },
    //this will allow the signup component to display an error for failed signup attempts
    failedSignup: (state, action) => {
      state.signupAttempt = false;
      console.log('Finished failedSignup. ', current.state);
    },
    //this will be dispatched if the user successfully logs into their account 
    loginCurrentUser: (state, action) => {
      state.loginAttempt = true;
      state.isLoggedIn = true;
      state.currentUser = action.userInfo;
      console.log('Finished loginCurrentUser. ', current.state);
    },
    //this will allow the login component to display an error for failed login attempts
    failedLogin: (state, action) => {
      state.loginAttempt = false;
      console.log('Finished failedLogin. ', current.state);
    },
    //this will log a user out of their account
    logOut: (state, action) => {
      state.isLoggedIn = false;
      state.signupAttempt = undefined;
      state.loginAttempt = undefined;
      state.currentUser = {};
      console.log('Finished logOut. ', current.state);
    }
  },
});

export const { signupCurrentUser, failedSignup, loginCurrentUser, failedLogin, logOut } = userSlice.actions;

export default userSlice.reducer;
