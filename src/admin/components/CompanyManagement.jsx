// src/admin/components/CompanyManagement.jsx
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, removeCompany } from '../adminSlice';
import CompanyForm from './CompanyForm'; // Import the CompanyForm component
import styles from './CompanyManagement.module.css'; // Import your CSS module

const CompanyManagement = () => {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.admin.companies);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this company?')) {
            dispatch(removeCompany(id));
        }
    };

    const handleEdit = (company) => {
        setSelectedCompany(company);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedCompany(null); // Reset selected company for new entry
        setShowForm(true);
    };

    return (
        <div>
            <button onClick={handleAddNew} className={styles.addButton}>Add Company</button>

            {/* Modal for adding/editing a company */}
            {showForm && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <CompanyForm 
                            company={selectedCompany} 
                            onClose={() => setShowForm(false)} 
                        />
                    </div>
                </div>
            )}

<div className={styles.cardContainer}>
    {companies.map((company) => (
        <div key={company.id} className={styles.card}>
            <h3 className={styles.name}>{company.name}</h3>
            <div className={styles.detailsGrid}>
                <span>Location: {company.location}</span>
                <span>LinkedIn: {company.linkedinProfile}</span>
                <span>Emails: {company.emails}</span>
                <span>Phone Numbers: {company.phoneNumbers}</span>
                <p>Comments: {company.comments}</p>
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={() => handleEdit(company)} className={styles.updateButton}>Update</button>
                <button onClick={() => handleDelete(company.id)} className={styles.deleteButton}>Delete</button>
            </div>
        </div>
    ))}
</div>
        </div>
    );
};

export default CompanyManagement;
