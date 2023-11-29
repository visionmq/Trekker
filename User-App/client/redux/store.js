import {configureStore} from '@reduxjs/toolkit';
import bookingReducer from './reducers/bookingSlice';
import userReducer from './reducers/userSliceSlice';
import propertyReducer from './reducers/propertySliceSlice';

const store = configureStore({
    devTools: true,
    reducer: {
        booking: bookingReducer,
        user: userReducer,
        property: propertyReducer,
    }
});

export default store;