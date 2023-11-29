import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './reducers/bookingSlice.js';
import userReducer from './reducers/userSlice.js';
import propertyReducer from './reducers/propertySlice.js';

const store = configureStore({
  devTools: true,
  reducer: {
    booking: bookingReducer,
    user: userReducer,
    property: propertyReducer,
  },
});

export default store;
