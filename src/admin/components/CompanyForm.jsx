import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createCompany, editCompany } from '../adminSlice';
import { validateCompanyForm } from '../../utils/formValidations'; // Import the validation utility
import styles from './CompanyForm.module.css'; // Import your CSS module

const CompanyForm = ({ company, onClose }) => {
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        linkedinProfile: '',
        emails: [''], // Initialize with one mandatory empty string
        phoneNumbers: [''], // Initialize with one mandatory empty string
        comments: '',
        communicationPeriodicity: '',
    });

    const [errors, setErrors] = useState({}); // State to hold error messages

    useEffect(() => {
        if (company) {
            setFormData(company);
        }
    }, [company]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear error for the current field
        setErrors({ ...errors, [name]: '' });
    };

    const handleEmailChange = (index, value) => {
        const newEmails = [...formData.emails];
        newEmails[index] = value;
        setFormData({ ...formData, emails: newEmails });
    };

    const handlePhoneChange = (index, value) => {
        const newPhones = [...formData.phoneNumbers];
        newPhones[index] = value;
        setFormData({ ...formData, phoneNumbers: newPhones });
    };

    const handleAddEmail = () => {
        setFormData({ ...formData, emails: [...formData.emails, ''] });
    };

    const handleRemoveEmail = (index) => {
        if (index > 0) { // Allow removal only for secondary emails
            const newEmails = formData.emails.filter((_, i) => i !== index);
            setFormData({ ...formData, emails: newEmails });
        }
    };

    const handleAddPhoneNumber = () => {
        setFormData({ ...formData, phoneNumbers: [...formData.phoneNumbers, ''] });
    };

    const handleRemovePhoneNumber = (index) => {
        if (index > 0) { // Allow removal only for secondary phone numbers
            const newPhones = formData.phoneNumbers.filter((_, i) => i !== index);
            setFormData({ ...formData, phoneNumbers: newPhones });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate that at least one email and one phone number are present
        const { valid, invalid } = validateCompanyForm(
            formData.name,
            formData.location,
            formData.emails,
            formData.phoneNumbers,
            formData.linkedinProfile,
            formData.communicationPeriodicity
        );
        
        if (!valid || formData.emails.length === 0 || formData.phoneNumbers.length === 0) {
            if (formData.emails.length === 0) {
                invalid.email = 'At least one email is required.';
            }
            if (formData.phoneNumbers.length === 0) {
                invalid.phone = 'At least one phone number is required.';
            }
            setErrors(invalid); // Set errors if present
            return; // Stop submission if there are errors
        }

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
            
            <label htmlFor="name">Company Name</label>
            <input 
                id="name" 
                type="text" 
                name="name" 
                placeholder="Enter company name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
            
            <label htmlFor="location">Location</label>
            <input 
                id="location" 
                type="text" 
                name="location" 
                placeholder="Enter location" 
                value={formData.location} 
                onChange={handleChange} 
                required 
            />
            {errors.location && <p className={styles.error}>{errors.location}</p>}
            
            <label htmlFor="linkedinProfile">LinkedIn Profile</label>
            <input 
                id="linkedinProfile" 
                type="text" 
                name="linkedinProfile" 
                placeholder="https://www.linkedin.com/in/your-profile" 
                value={formData.linkedinProfile} 
                onChange={handleChange} 
            />
            {errors.linkedinProfile && <p className={styles.error}>{errors.linkedinProfile}</p>}
            
            <label>Emails</label>
            {formData.emails.map((email, index) => (
                <div key={index}>
                    <input 
                        type="email" 
                        placeholder="example1@mail.com" 
                        value={email} 
                        onChange={(e) => handleEmailChange(index, e.target.value)} 
                        required={index === 0} // First email is required
                    />
                    {index > 0 && (
                        <button type="button" className={styles.removeEmailBtn} onClick={() => handleRemoveEmail(index)}>Remove</button>
                    )}
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                </div>
            ))}
            <button type="button" className={styles.addEmailBtn} onClick={handleAddEmail}>Add Email</button>

            <label>Phone Numbers</label>
            {formData.phoneNumbers.map((phone, index) => (
                <div key={index}>
                    <input 
                        type="tel" 
                        placeholder="1234567890" 
                        value={phone} 
                        onChange={(e) => handlePhoneChange(index, e.target.value)} 
                        required={index === 0} // First phone number is required
                    />
                    {index > 0 && (
                        <button type="button" className={styles.removePhoneBtn} onClick={() => handleRemovePhoneNumber(index)}>Remove</button>
                    )}
                    {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                </div>
            ))}
            <button type="button" className={styles.addPhoneBtn} onClick={handleAddPhoneNumber}>Add Phone Number</button>

            <label htmlFor="comments">Comments</label>
            <textarea 
                id="comments"
                name="comments" 
                placeholder="Additional information about the company..." 
                value={formData.comments} 
                onChange={handleChange}
            ></textarea>

            <label htmlFor="communicationPeriodicity">Communication Periodicity</label>
            <input
                id="communicationPeriodicity"
                type="text"
                name="communicationPeriodicity"
                placeholder="e.g., every 2 weeks"
                value={formData.communicationPeriodicity}
                onChange={handleChange}
            />
            {errors.communicationPeriodicity && (
              <p className={styles.error}>{errors.communicationPeriodicity}</p>
            )}
            
            {/* Centering the submit button */}
            <div className={styles.buttonContainer}>
                <button type="submit">{company ? 'Update' : 'Add'} Company</button>
            </div>
        </form>
    );
};

export default CompanyForm;
