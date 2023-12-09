import { createSlice } from '@reduxjs/toolkit';

export const propertySlice = createSlice({
  name: 'property',
  initialState: {
    allProperties: [],
    propertyName: undefined,
    propertyLocation: undefined,
    availableDates: [],
  },
  reducers: {
    updateAllProperties: (state, action) => {
      state.allProperties = action.properties; 
    },
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

export const {
  updateAllProperties,
  updateAvailableDates,
  updatePropertyLocation,
  updatePropertyName,
} = propertySlice.actions;

export default propertySlice.reducer;
