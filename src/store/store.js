import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../user/userSlice';
import adminReducer from '../admin/adminSlice'; // Import admin reducer if needed

const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer, // Add admin reducer if you have one
    },
});

export default store;
