import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    companies: [],
    communicationMethods: [],
    error: null,
    loading: false, // Added loading state
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setCompanies(state, action) {
            state.companies = action.payload;
        },
        addCompany(state, action) {
            state.companies.push(action.payload);
        },
        updateCompany(state, action) {
            const index = state.companies.findIndex(company => company.id === action.payload.id);
            if (index !== -1) {
                state.companies[index] = action.payload;
            }
        },
        deleteCompany(state, action) {
            state.companies = state.companies.filter(company => company.id !== action.payload);
        },
        setCommunicationMethods(state, action) {
            state.communicationMethods = action.payload;
        },
        addCommunicationMethod(state, action) {
            state.communicationMethods.push(action.payload);
        },
        updateCommunicationMethod(state, action) {
            const index = state.communicationMethods.findIndex(method => method.id === action.payload.id);
            if (index !== -1) {
                state.communicationMethods[index] = action.payload;
            }
        },
        deleteCommunicationMethod(state, action) {
            state.communicationMethods = state.communicationMethods.filter(method => method.id !== action.payload);
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setLoading(state, action) { // Added loading reducer
            state.loading = action.payload;
        },
    },
});

// Export actions for use in components
export const { 
    setCompanies, 
    addCompany, 
    updateCompany, 
    deleteCompany,
    setCommunicationMethods,
    addCommunicationMethod,
    updateCommunicationMethod,
    deleteCommunicationMethod,
    setError,
    setLoading 
} = adminSlice.actions;

// Define the base URL for API requests
const BASE_URL = 'https://json-server-main-fc76.onrender.com';

// Helper function for API calls
const handleApiCall = async (dispatch, apiCall, successAction) => {
    try {
        dispatch(setLoading(true)); // Set loading to true before API call
        dispatch(setError(null)); // Clear previous errors
        const response = await apiCall();
        dispatch(successAction(response.data));
    } catch (error) {
        console.error('API call error:', {
            message: error.message,
            response: error.response,
            stack: error.stack,
        });
        dispatch(setError(error.response?.data?.message || error.message));
    } finally {
        dispatch(setLoading(false)); // Set loading to false after API call
    }
};

// Fetch companies from API
export const fetchCompanies = () => async (dispatch) => {
    await handleApiCall(dispatch, () => axios.get(`${BASE_URL}/companies`), setCompanies);
};

// Create a new company
export const createCompany = (company) => async (dispatch) => {
    await handleApiCall(dispatch, () => axios.post(`${BASE_URL}/companies`, company), addCompany);
};

// Edit an existing company
export const editCompany = (company) => async (dispatch) => {
    await handleApiCall(dispatch, () => axios.put(`${BASE_URL}/companies/${company.id}`, company), updateCompany);
};

// Remove a company
export const removeCompany = (id) => async (dispatch) => {
    await handleApiCall(dispatch, () => axios.delete(`${BASE_URL}/companies/${id}`), () => deleteCompany(id));
};

// Fetch communication methods from API
export const fetchCommunicationMethods = () => async (dispatch) => {
    await handleApiCall(dispatch, () => axios.get(`${BASE_URL}/communication-methods`), setCommunicationMethods);
};

// Create a new communication method
export const createCommunicationMethod = (method) => async (dispatch) => {
    await handleApiCall(dispatch, () => axios.post(`${BASE_URL}/communication-methods`, method), addCommunicationMethod);
};

// Edit an existing communication method
export const editCommunicationMethod = (method) => async (dispatch) => {
    await handleApiCall(dispatch, () => axios.put(`${BASE_URL}/communication-methods/${method.id}`, method), updateCommunicationMethod);
};

// Remove a communication method
export const removeCommunicationMethod = (id) => async (dispatch) => {
    await handleApiCall(dispatch, () => axios.delete(`${BASE_URL}/communication-methods/${id}`), () => deleteCommunicationMethod(id));
};

export default adminSlice.reducer;
