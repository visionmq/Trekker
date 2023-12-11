/* 
Will likely need this once we change the inventory from quantity to dates. 
*/ 


// import { createSlice } from '@reduxjs/toolkit';

// export const bookingSlice = createSlice({
//   name: 'booking',
//   initialState: {
//     selectedProperty: undefined,
//     bookingStartDate: undefined,
//     bookingEndDate: undefined,
//     readyToBook: false,
//   },
//   reducers: {
//     updateSelectedProperty: (state, action) => {
//       const property = action.title; //subject to change 
//       state.selectedProperty = property;
//     },
//     updateStartDate: (state, action) => {
//       const start = action.startDate;
//       state.bookingStartDate = start;
//     },
//     updateEndDate: (state, action) => {
//       const end = action.endDate;
//       state.bookingEndDate = end;
//     },
//     bookProperty: (state, action) => {
//       state.readyToBook = true;
//     }
//   },
// });

// export const {bookProperty, updateEndDate, updateSelectedProperty, updateStartDate} = bookingSlice.actions;

// export default bookingSlice.reducer;