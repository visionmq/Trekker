import { createSlice, current } from '@reduxjs/toolkit';

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
    //this reducer will change loadStatus to either failed or success. If failed, we can display some type of error on the listing page instead of it being blank. 
    updateLoadState: (state, action) => {
      state.loadStatus = action.status;
      console.log('Finished updateLoadState. ', current.state);
    },
    //this will take all of the properties from Inv and store them for the listing page
    updateAllProperties: (state, action) => {
      const payload = action.payload
      console.log('in updateAllProp', payload)
      state.allProperties = payload.properties; 
      state.loadStatus = payload.status;
      console.log('Finished updateAllProperties. ', current(state));
    },
    //this will be updated when the user clicks on a single property from the listings page. We could change this later to hold an object, or we can have the component filter through the array of all properties to find a match to the title
    updatePropertyName: (state, action) => {
      state.propertyName = action.title;
      console.log('Finished updatePropertyName. ', current.state);
    },
    //this will hold the property location. Currently not being used. 
    updatePropertyLocation: (state, action) => {
      state.propertyLocation = action.location;
      console.log('Finished updatePropertyLocation. ', current.state);
    },
    //this will hold the quantity of dates the unit has available (at the time of receiving all of the listings from Inv). Will need to be changed later when we shift this to a date-based inventory 
    updateAvailableDates: (state, action) => {
      state.availableDates = action.quantity;
      console.log('Finished updateAvailableDates. ', current.state);
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
