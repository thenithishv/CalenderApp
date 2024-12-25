import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createCompany, editCompany } from '../adminSlice';
import styles from './CompanyForm.module.css'; // Import your CSS module

const CompanyForm = ({ company, onClose }) => {
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        linkedinProfile: '',
        emails: '',
        phoneNumbers: '',
        comments: '',
    });

    useEffect(() => {
        if (company) {
            setFormData(company);
        }
    }, [company]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (company) {
            dispatch(editCompany(formData)); // Update existing company
        } else {
            dispatch(createCompany(formData)); // Create new company
        }
        onClose(); // Close the form after submission
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{company ? 'Update Company' : 'Add Company'}</h2>
            <input type="text" name="name" placeholder="Company Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
            <input type="text" name="linkedinProfile" placeholder="LinkedIn Profile" value={formData.linkedinProfile} onChange={handleChange} />
            <input type="text" name="emails" placeholder="Emails" value={formData.emails} onChange={handleChange} required />
            <input type="text" name="phoneNumbers" placeholder="Phone Numbers" value={formData.phoneNumbers} onChange={handleChange} required />
            <textarea name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange}></textarea>
            
            {/* Button container for side-by-side buttons */}
            <div className={styles.buttonContainer}>
                <button type="button" className={styles.closeButton} onClick={onClose}>Cancel</button>
                <button type="submit">{company ? 'Update' : 'Add'} Company</button>
            </div>
        </form>
    );
};

export default CompanyForm;
