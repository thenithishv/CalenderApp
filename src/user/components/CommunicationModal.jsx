import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommunication } from '../userSlice';
import styles from './CommunicationModal.module.css'; // Ensure you have styles for your modal

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
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2 className={styles.modalTitle}>Log Communication</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="type" className={styles.label}>Type of Communication:</label>
                    <select 
                        id="type" 
                        value={communicationType} 
                        onChange={(e) => setCommunicationType(e.target.value)} 
                        required
                        className={styles.input}
                    >
                        <option value="">Select Type</option>
                        {communicationMethods.map(method => (
                            <option key={method.id} value={method.name}>{method.name}</option>
                        ))}
                    </select>

                    <label htmlFor="date" className={styles.label}>Date of Communication:</label>
                    <input 
                        type="date" 
                        id="date" 
                        value={communicationDate} 
                        onChange={(e) => setCommunicationDate(e.target.value)} 
                        required 
                        className={styles.input}
                    />

                    <label htmlFor="notes" className={styles.label}>Notes:</label>
                    <textarea 
                        id="notes" 
                        value={notes} 
                        onChange={(e) => setNotes(e.target.value)} 
                        className={styles.textarea}
                    />

                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.submitButton}>Log Communication</button>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommunicationModal;
