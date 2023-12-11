import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './reducers/bookingSlice.js';
import userReducer from './reducers/userSlice.js';
import propertyReducer from './reducers/propertySlice.js';
import checkoutReducer from './reducers/checkoutSlice.js';
import websocketMiddleware from './reducers/websocketMiddleware.js';
import checkoutSlice from './reducers/checkoutSlice.js';

let ws_url = new URL(window.location.href);
ws_url.protocol = 'ws:';
ws_url.port = 443;

const store = configureStore({
  devTools: true,
  reducer: {
    user: userReducer,
    property: propertyReducer,
    checkout: checkoutSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware(ws_url.toString())),
});

export default store;
