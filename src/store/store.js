// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../admin/adminSlice'; // Adjust the path as necessary

const store = configureStore({
    reducer: {
        admin: adminReducer,
    },
});

export default store; // Ensure this line is present for default export
