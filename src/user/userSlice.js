import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for the user slice
const initialState = {
    companiesUser: [],
    communicationMethods: [],
    communications: [],
    loading: false,
    error: null,
};

const BASE_URL = 'https://json-server-main-fc76.onrender.com';

// Fetch Companies
export const fetchCompaniesUser = createAsyncThunk(
    'user/fetchCompaniesUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/companies`);
            return response.data; // Return fetched data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Fetch Communication Methods
export const fetchCommunicationMethods = createAsyncThunk(
    'user/fetchCommunicationMethods',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/communication-methods`);
            return response.data; // Return fetched data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Fetch Communications
export const fetchCommunications = createAsyncThunk(
    'user/fetchCommunications',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/communications`);
            return response.data; // Return fetched data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Async thunk to mark communication as done
export const markCommunicationAsDoneAsync = createAsyncThunk(
    'user/markCommunicationAsDone',
    async (commId, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const communicationToUpdate = state.user.communications.find(comm => comm.id === commId);

            if (!communicationToUpdate) throw new Error('Communication not found');

            // Create updated communication object
            const updatedCommunication = {
                ...communicationToUpdate,
                communication: {
                    ...communicationToUpdate.communication,
                    done: true,
                },
            };

            // Send update request to server
            await axios.put(`${BASE_URL}/communications/${commId}`, updatedCommunication);
            return updatedCommunication; // Return the updated communication
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Create user slice
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
            .addCase(fetchCompaniesUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompaniesUser.fulfilled, (state, action) => {
                state.loading = false;
                state.companiesUser = action.payload; // Update companiesUser with fetched data
            })
            .addCase(fetchCompaniesUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set error message on failure
            })
            .addCase(fetchCommunicationMethods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCommunicationMethods.fulfilled, (state, action) => {
                state.loading = false;
                state.communicationMethods = action.payload; // Update communicationMethods with fetched data
            })
            .addCase(fetchCommunicationMethods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set error message on failure
            })
            .addCase(fetchCommunications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCommunications.fulfilled, (state, action) => {
                state.loading = false;
                state.communications = action.payload; // Update communications with fetched data
            })
            .addCase(fetchCommunications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set error message on failure
            })
            .addCase(markCommunicationAsDoneAsync.fulfilled, (state, action) => {
                const index = state.communications.findIndex(comm => comm.id === action.payload.id);
                if (index !== -1) {
                    state.communications[index] = action.payload; // Update with server response
                }
            })
            .addCase(markCommunicationAsDoneAsync.rejected, (state, action) => {
                state.error = action.payload; // Set error message on failure
                console.error('Error marking communication as done:', action.payload);
            });
    },
});

// Export a selector to get all communications
export const selectAllCommunications = (state) => state.user.communications;

export const { addCommunication } = userSlice.actions; // Exporting the addCommunication reducer action

export default userSlice.reducer; // Exporting the user reducer
