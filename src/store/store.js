import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../user/userSlice';
import adminReducer from '../admin/adminSlice'; 
import loginReducer from '../login/loginSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        login: loginReducer,

    },
});

export default store;
