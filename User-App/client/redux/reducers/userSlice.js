import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    currentUser: {},
  },
  reducers: {
    loggedIn: (state, action) => {
      state.isLoggedIn = true;
    },
    updateCurrentUser: (state, action) => {
      const user = action.userInfo;
      state.currentUser = user;
    }
  },
});

export const { loggedIn, updateCurrentUser} = bookingSlice.actions;

export default userSlice.reducer;