import { createSlice, current } from '@reduxjs/toolkit';

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
    //this will update the listing selected to send off to Inv and Bill when the user tries to checkout 
    updateSelectedProperty: (state, action) => {
      state.selectedProperty = action.property;
      console.log('Finished updateSelectedProperty. ', current.state);
    },
    //will update how many nights the user wants to book, and will update the 'readyToBook' piece of state so we can allow the user to submit their order. 
    updateSelectedDates: (state, action) => {
      state.selectedDates = action.quantity;
      state.readyToBook = true;
      console.log('Finished updateSelectedDates. ', current.state);
    },
    //this may or may not be needed. It could persist across listing pages so the user does not need to reselect their dates, but also could be reset if they create a new search or something. 
    removeSelectedDates: (state, action) => {
      state.selectedDates = undefined;
      console.log('Finished removeSelectedDates. ', current.state);
    },
    //also may or may not be needed. Just a fail safe from sending a message for a booking if there is missing information (prop or dates) 
    updateReadyToBook: (state, action) => {
      state.readyToBook = false;
      console.log('Finished updateReadyToBook. ', current.state);
    },
    //this will update the component when the checkout is successful 
    checkoutOutcome: (state, action) => {
      state.checkoutStatus = action.outcome;
      console.log('Finished checkoutOutcome. ', current.state);
    },
    //this will likely be used later, we could enable users to check out as guests and then require more information on the checkout page. However, this would mean that we wouldn't have any user to store it with in the DB. If we have time, need to dicuss user story more. 
    checkoutAsGuest: (state, action) => {
      state.userOrGuest = true;
      console.log('Finished checkoutAsGuest. ', current.state);
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
