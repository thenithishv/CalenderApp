import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, removeCompany } from '../adminSlice';
import CompanyForm from './CompanyForm';
import Modal from './Modal';
import styles from './CompanyManagement.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrashCan } from '@fortawesome/free-regular-svg-icons';

const CompanyManagement = () => {
   const dispatch = useDispatch();
   const companies = useSelector((state) => state.admin.companies);
   const [selectedCompany, setSelectedCompany] = useState(null);
   const [showModal, setShowModal] = useState(false);

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
       setShowModal(true);
   };

   const handleAddNew = () => {
       setSelectedCompany(null); // Reset selected company for new entry
       setShowModal(true);
   };

   const handleClose = () => {
       setShowModal(false);
       setSelectedCompany(null); // Reset selected company when closing
   };

   return (
       <div>
           <button onClick={handleAddNew} className={styles.addButton}>Add Company</button>

           {/* Custom Modal for adding/editing a company */}
           <Modal isOpen={showModal} onClose={handleClose}>
               <CompanyForm company={selectedCompany} onClose={handleClose} />
           </Modal>

           <div className={styles.cardContainer}>
               {companies.map((company) => (
                   <div key={company.id} className={styles.card}>
                       <h3 className={styles.name}>{company.name}</h3>
                       <div className={styles.detailsGrid}>
                           <span>Location: {company.location}</span>
                           <span>LinkedIn Profile: {company.linkedinProfile}</span>
                           <span>Emails: {company.emails}</span>
                           <span>Phone Numbers: {company.phoneNumbers}</span>
                           <span>Comments: {company.comments}</span>
                           <span>Communication Periodicity: {company.communicationPeriodicity}</span>
                       </div>
                       <div className={styles.buttonContainer}>
                           <button onClick={() => handleEdit(company)} className={styles.updateButton}><FontAwesomeIcon icon={faEdit} /></button>
                           <button onClick={() => handleDelete(company.id)} className={styles.deleteButton}><FontAwesomeIcon icon={faTrashCan} /></button>
                       </div>
                   </div>
               ))}
           </div>
       </div>
   );
};

export default CompanyManagement;