import { createSlice } from '@reduxjs/toolkit';

export const propertySlice = createSlice({
  name: 'property',
  initialState: {
    allProperties: [],
    loadStatus: null,
    propertyName: undefined,
    propertyLocation: undefined,
    availableDates: undefined,
  },
  reducers: {
    updateLoadState: (state, action) => {
      state.loadStatus = action.status;
    },
    updateAllProperties: (state, action) => {
      state.allProperties = action.properties; 
      state.loadStatus = action.status;
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
      state.availableDates = action.quantity;
    },
  },
});

export const {
  updateLoadState,
  updateAllProperties,
  updateAvailableDates,
  updatePropertyLocation,
  updatePropertyName,
} = propertySlice.actions;

export default propertySlice.reducer;
