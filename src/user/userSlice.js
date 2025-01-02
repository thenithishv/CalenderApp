import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    companiesUser: [],
    communicationMethods: [],
    communications: [],
    loading: false,
    error: null,
};

const BASE_URL = 'https://json-server-main-fc76.onrender.com/';

// Fetch Companies
export const fetchCompaniesUser = createAsyncThunk(
    'user/fetchCompaniesUser',
    async () => {
        const response = await axios.get(`${BASE_URL}/companies`);
        return response.data;
    }
);

// Fetch Communication Methods
export const fetchCommunicationMethods = createAsyncThunk(
    'user/fetchCommunicationMethods',
    async () => {
        const response = await axios.get(`${BASE_URL}/communication-methods`);
        return response.data;
    }
);

// Fetch Communications
export const fetchCommunications = createAsyncThunk(
    'user/fetchCommunications',
    async () => {
        const response = await axios.get(`${BASE_URL}/communications`);
        return response.data;
    }
);

// Async thunk to mark communication as done
export const markCommunicationAsDoneAsync = createAsyncThunk(
    'user/markCommunicationAsDone',
    async (commId, { getState }) => {
        const state = getState();
        const communicationToUpdate = state.user.communications.find(comm => comm.id === commId);
        
        if (!communicationToUpdate) throw new Error('Communication not found');

        const updatedCommunication = {
            ...communicationToUpdate,
            communication: {
                ...communicationToUpdate.communication,
                done: true,
            },
        };

        await axios.put(`${BASE_URL}/communications/${commId}`, updatedCommunication);
        return updatedCommunication; // Return the updated communication
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addCommunication(state, action) {
            const newCommunication = action.payload.communication;
            state.communications.push(newCommunication);

            // Saving the communication to DB
            axios.post(`${BASE_URL}/communications`, newCommunication)
                .then(response => console.log('New communication saved:', response.data))
                .catch(error => console.error('Error saving communication:', error));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompaniesUser.fulfilled, (state, action) => {
                state.companiesUser = action.payload;
            })
            .addCase(fetchCommunicationMethods.fulfilled, (state, action) => {
                state.communicationMethods = action.payload;
            })
            .addCase(fetchCommunications.fulfilled, (state, action) => {
                state.communications = action.payload; // Store fetched communications
            })
            .addCase(fetchCompaniesUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(fetchCommunicationMethods.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(fetchCommunications.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(markCommunicationAsDoneAsync.fulfilled, (state, action) => {
                const index = state.communications.findIndex(comm => comm.id === action.payload.id);
                if (index !== -1) {
                    state.communications[index] = action.payload; // Update with server response
                }
            })
            .addCase(markCommunicationAsDoneAsync.rejected, (state, action) => {
                console.error('Error marking communication as done:', action.error.message);
            });
    },
});

// Export a selector to get all communications
export const selectAllCommunications = (state) => state.user.communications;

export const { addCommunication } = userSlice.actions;
export default userSlice.reducer;
