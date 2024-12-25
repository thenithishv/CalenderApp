import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    companies: [],
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
    },
});

export const { setCompanies, addCompany, updateCompany, deleteCompany } = adminSlice.actions;

export const fetchCompanies = () => async (dispatch) => {
    const response = await axios.get('http://localhost:3000/companies');
    dispatch(setCompanies(response.data));
};

export const createCompany = (company) => async (dispatch) => {
    const response = await axios.post('http://localhost:3000/companies', company);
    dispatch(addCompany(response.data));
};

export const editCompany = (company) => async (dispatch) => {
    const response = await axios.put(`http://localhost:3000/companies/${company.id}`, company);
    dispatch(updateCompany(response.data));
};

export const removeCompany = (id) => async (dispatch) => {
    await axios.delete(`http://localhost:3000/companies/${id}`);
    dispatch(deleteCompany(id));
};

export default adminSlice.reducer;
