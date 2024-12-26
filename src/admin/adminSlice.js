
// src/admin/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    companies: [],
    communicationMethods: [], // Added for communication methods
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
    },
});

export const { setCompanies, addCompany, updateCompany, deleteCompany, 
                setCommunicationMethods, addCommunicationMethod, 
                updateCommunicationMethod, deleteCommunicationMethod } = adminSlice.actions;

// Fetch companies from API
export const fetchCompanies = () => async (dispatch) => {
    const response = await axios.get('http://localhost:3000/companies');
    dispatch(setCompanies(response.data));
};

// Create a new company
export const createCompany = (company) => async (dispatch) => {
    const response = await axios.post('http://localhost:3000/companies', company);
    dispatch(addCompany(response.data));
};

// Edit an existing company
export const editCompany = (company) => async (dispatch) => {
    const response = await axios.put(`http://localhost:3000/companies/${company.id}`, company);
    dispatch(updateCompany(response.data));
};

// Remove a company
export const removeCompany = (id) => async (dispatch) => {
    await axios.delete(`http://localhost:3000/companies/${id}`);
    dispatch(deleteCompany(id));
};

// Fetch communication methods from API
export const fetchCommunicationMethods = () => async (dispatch) => {
    const response = await axios.get('http://localhost:3000/communication-methods'); // Adjust the URL as needed
    dispatch(setCommunicationMethods(response.data));
};

// Create a new communication method
export const createCommunicationMethod = (method) => async (dispatch) => {
    const response = await axios.post('http://localhost:3000/communication-methods', method); // Adjust the URL as needed
    dispatch(addCommunicationMethod(response.data));
};

// Edit an existing communication method
export const editCommunicationMethod = (method) => async (dispatch) => {
    const response = await axios.put(`http://localhost:3000/communication-methods/${method.id}`, method); // Adjust the URL as needed
    dispatch(updateCommunicationMethod(response.data));
};

// Remove a communication method
export const removeCommunicationMethod = (id) => async (dispatch) => {
    await axios.delete(`http://localhost:3000/communication-methods/${id}`); // Adjust the URL as needed
    dispatch(deleteCommunicationMethod(id));
};
export default adminSlice.reducer;