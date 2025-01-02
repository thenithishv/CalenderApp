import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, removeCompany } from '../adminSlice';
import CompanyForm from './CompanyForm';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import styles from './CompanyManagement.module.css';

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
    setSelectedCompany(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCompany(null);
  };

  return (
    <div className={styles.managementContainer}>
      <div className={styles.header}>
        <button onClick={handleAddNew} className={styles.addCompanyButton}>
          Add Company
        </button>
      </div>

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
              <span>Emails: {company.emails.join(', ')}</span>
              <span>Phone Numbers: {company.phoneNumbers.join(', ')}</span>
              <span>Comments: {company.comments}</span>
              <span>Communication Periodicity: {company.communicationPeriodicity}</span>
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => handleEdit(company)}
                className={styles.editCompanyButton}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => handleDelete(company.id)}
                className={styles.deleteCompanyButton}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyManagement;