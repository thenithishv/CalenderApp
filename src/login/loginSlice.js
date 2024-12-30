import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    admin: null,
    loading: false,
    error: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginRequest(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            if (action.payload.isAdmin) {
                state.admin = action.payload.user;
            } else {
                state.user = action.payload.user;
            }
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.admin = null;
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;
