import { createSlice } from '@reduxjs/toolkit';

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    selectedProperty: undefined,
    selectedDates: undefined,
    readyToBook: false,
    availableDates: undefined,
    checkoutOutcome: undefined,
    userOrGuest: false,
  },
  reducers: {
    updateSelectedProperty: (state, action) => {
      state.selectedProperty = action.property;
    },
    updateSelectedDates: (state, action) => {
      state.selectedProperty = action.quantity;
      state.readyToBook = true;
    },
    removeSelectedDates: (state, action) => {
      state.selectedProperty = undefined;
    },
    updateReadyToBook: (state, action) => {
      state.readyToBook = false;
    },
    checkoutOutcome: (state, action) => {
      state.checkoutStatus = action.outcome;
    },
    checkoutAsGuest: (state, action) => {
      state.userOrGuest = true;
    },
  },
});

export const {
  updateSelectedProperty,
  updateSelectedDates,
  removeSelectedDates,
  updateReadyToBook,
  checkoutOutcome,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
