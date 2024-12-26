// src/admin/components/CommunicationMethodForm.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createCommunicationMethod, editCommunicationMethod } from '../adminSlice'; 
import styles from './CommunicationMethodForm.module.css'; 

const CommunicationMethodForm = ({ method, onClose }) => {
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sequence: '',
        mandatory: false,
    });

    const [errors, setErrors] = useState({}); 
    const [isOtherSelected, setIsOtherSelected] = useState(false); 

    const communicationMethods = [
        { id: 1, name: 'LinkedIn Post' },
        { id: 2, name: 'LinkedIn Message' },
        { id: 3, name: 'Email' },
        { id: 4, name: 'Phone Call' },
        { id: 5, name: 'Other' },
    ];

    useEffect(() => {
        if (method) {
            setFormData(method);
            setIsOtherSelected(method.name === 'Other');
        }
    }, [method]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name === 'name' && value === 'Other') {
            setIsOtherSelected(true);
            setFormData({ ...formData, [name]: value });
        } else {
            setIsOtherSelected(false);
            setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        }

        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.description || !formData.sequence) {
            let newErrors = {};
            if (!formData.name) newErrors.name = 'Name is required.';
            if (!formData.description) newErrors.description = 'Description is required.';
            if (!formData.sequence) newErrors.sequence = 'Sequence is required.';
            setErrors(newErrors);
            return;
        }

        if (method) {
            dispatch(editCommunicationMethod(formData)); 
        } else {
            dispatch(createCommunicationMethod(formData)); 
        }
        
        onClose(); 
    };

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>{method ? 'Update Communication Method' : 'Add Communication Method'}</h2>
                <label htmlFor="name">Name</label>
                <select 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Select a communication method</option>
                    {communicationMethods.map((cm) => (
                        <option key={cm.id} value={cm.name}>{cm.name}</option>
                    ))}
                </select>
                {errors.name && <p className={styles.error}>{errors.name}</p>}

                {isOtherSelected && (
                    <input 
                        type="text" 
                        name="otherName" 
                        placeholder="Enter custom communication method"
                        value={formData.name === 'Other' ? formData.otherName : ''} // Bind to otherName if needed
                        onChange={(e) => setFormData({ ...formData, otherName: e.target.value })}
                    />
                )}

                <label htmlFor="description">Description</label>
                <input 
                    id="description" 
                    type="text" 
                    name="description" 
                    placeholder="Enter description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                />
                {errors.description && <p className={styles.error}>{errors.description}</p>}
                
                <label htmlFor="sequence">Sequence</label>
                <input 
                    id="sequence" 
                    type="number" 
                    name="sequence" 
                    placeholder="Enter sequence order" 
                    value={formData.sequence} 
                    onChange={handleChange} 
                    required 
                />
                {errors.sequence && <p className={styles.error}>{errors.sequence}</p>}
                
                <label htmlFor="mandatory">
                    <input 
                        id="mandatory" 
                        type="checkbox" 
                        name="mandatory" 
                        checked={formData.mandatory} 
                        onChange={handleChange} 
                    />
                    Mandatory?
                </label>

                {/* Only the update button at the bottom */}
                <button type="submit" className={styles.submitButton}>{method ? 'Update' : 'Add'} Method</button>
            </form>
        </div>
    );
};

export default CommunicationMethodForm;
