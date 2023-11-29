import { createSlice } from '@reduxjs/toolkit';

export const propertySlice = createSlice({
  name: 'property',
  initialState: {
    propertyName: undefined,
    propertyLocation: undefined,
    availableDates: [],
  },
  reducers: {
    updatePropertyName: (state, action) => {
      const title = action.title;
      state.propertyName = title;
    },
    updatePropertyLocation: (state, action) => {
      const location = action.location;
      state.propertyLocation = location;
    },
    updateAvailableDates: (state, action) => {
      const dates = action.dates;
      state.availableDates = dates;
    },
  },
});

export const { updateAvailableDates, updatePropertyLocation, updatePropertyName } = bookingSlice.actions;

export default propertySlice.reducer;