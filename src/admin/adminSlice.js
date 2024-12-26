// src/admin/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    companies: [],
    communicationMethods: [],
    error: null, // Added for error handling
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
        setError(state, action) { // New reducer to handle errors
            state.error = action.payload;
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
    setError 
} = adminSlice.actions;

// Define the base URL for API requests
const BASE_URL = 'http://localhost:3000';

// Fetch companies from API
export const fetchCompanies = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/companies`);
        dispatch(setCompanies(response.data));
    } catch (error) {
        console.error('Error fetching companies:', error); // Log full error for debugging
        dispatch(setError(error.response?.data?.message || error.message)); // Dispatch error message on failure
    }
};

// Create a new company
export const createCompany = (company) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/companies`, company);
        dispatch(addCompany(response.data));
    } catch (error) {
        console.error('Error creating company:', error); // Log full error for debugging
        dispatch(setError(error.response?.data?.message || error.message)); // Dispatch error message on failure
    }
};

// Edit an existing company
export const editCompany = (company) => async (dispatch) => {
    try {
        const response = await axios.put(`${BASE_URL}/companies/${company.id}`, company);
        dispatch(updateCompany(response.data));
    } catch (error) {
        console.error('Error editing company:', error); // Log full error for debugging
        dispatch(setError(error.response?.data?.message || error.message)); // Dispatch error message on failure
    }
};

// Remove a company
export const removeCompany = (id) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/companies/${id}`);
        dispatch(deleteCompany(id));
    } catch (error) {
        console.error('Error deleting company:', error); // Log full error for debugging
        dispatch(setError(error.response?.data?.message || error.message)); // Dispatch error message on failure
    }
};

// Fetch communication methods from API
export const fetchCommunicationMethods = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/communication-methods`); // Adjust the URL as needed
        dispatch(setCommunicationMethods(response.data));
    } catch (error) {
        console.error('Error fetching communication methods:', error); // Log full error for debugging
        dispatch(setError(error.response?.data?.message || error.message)); // Dispatch error message on failure
    }
};

// Create a new communication method
export const createCommunicationMethod = (method) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/communication-methods`, method); // Adjust the URL as needed
        dispatch(addCommunicationMethod(response.data));
    } catch (error) {
        console.error('Error creating communication method:', error); // Log full error for debugging
        dispatch(setError(error.response?.data?.message || error.message)); // Dispatch error message on failure
    }
};

// Edit an existing communication method
export const editCommunicationMethod = (method) => async (dispatch) => {
    try {
        const response = await axios.put(`${BASE_URL}/communication-methods/${method.id}`, method); // Adjust the URL as needed
        dispatch(updateCommunicationMethod(response.data));
    } catch (error) {
        console.error('Error editing communication method:', error); // Log full error for debugging
        dispatch(setError(error.response?.data?.message || error.message)); // Dispatch error message on failure
    }
};

// Remove a communication method
export const removeCommunicationMethod = (id) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/communication-methods/${id}`); // Adjust the URL as needed
        dispatch(deleteCommunicationMethod(id));
    } catch (error) {
        console.error('Error deleting communication method:', error); // Log full error for debugging
        dispatch(setError(error.response?.data?.message || error.message)); // Dispatch error message on failure
    }
};

export default adminSlice.reducer;
