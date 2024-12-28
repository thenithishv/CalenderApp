import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommunication } from '../userSlice';

const CommunicationModal = ({ selectedCompanies, onClose, communicationMethods }) => {
    const dispatch = useDispatch();
    
    const [communicationType, setCommunicationType] = useState('');
    const [communicationDate, setCommunicationDate] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!communicationType || !communicationDate) {
            alert("Please fill in all required fields.");
            return;
        }

        selectedCompanies.forEach(companyId => {
            const newCommunication = {
                id: Date.now().toString(), // Unique ID based on timestamp
                companyId,
                communication: {
                    type: communicationType,
                    date: communicationDate,
                    notes,
                    done: false // Initially set to false
                }
            };

            // Dispatch action to add communication
            dispatch(addCommunication({ companyId, communication: newCommunication }));
        });

        onClose(); // Close the modal after submission
    };

    return (
        <div className="modal">
            <h2>Log Communication</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="type">Type of Communication:</label>
                <select 
                    id="type" 
                    value={communicationType} 
                    onChange={(e) => setCommunicationType(e.target.value)} 
                    required
                >
                    <option value="">Select Type</option>
                    {communicationMethods.map(method => (
                        <option key={method.id} value={method.name}>{method.name}</option>
                    ))}
                </select>

                <label htmlFor="date">Date of Communication:</label>
                <input 
                    type="date" 
                    id="date" 
                    value={communicationDate} 
                    onChange={(e) => setCommunicationDate(e.target.value)} 
                    required 
                />

                <label htmlFor="notes">Notes:</label>
                <textarea 
                    id="notes" 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)} 
                />

                <button type="submit">Log Communication</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default CommunicationModal;