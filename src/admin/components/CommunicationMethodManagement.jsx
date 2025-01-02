import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunicationMethods, removeCommunicationMethod } from '../adminSlice';
import CommunicationMethodForm from './CommunicationMethodForm';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import styles from './CommunicationMethodManagement.module.css';

const CommunicationMethodManagement = () => {
  const dispatch = useDispatch();
  const methods = useSelector((state) => state.admin.communicationMethods);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        await dispatch(fetchCommunicationMethods());
      } catch (err) {
        setError('Failed to fetch communication methods.');
        console.error('Error fetching communication methods:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMethods();
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this communication method?')) {
      try {
        await dispatch(removeCommunicationMethod(id));
      } catch (err) {
        setError('Failed to delete communication method.');
        console.error('Error deleting communication method:', err);
      }
    }
  };

  const handleEdit = (method) => {
    setSelectedMethod(method);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setSelectedMethod(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedMethod(null);
  };

  const sortedMethods = [...methods].sort((a, b) => a.sequence - b.sequence);

  return (
    <div className={styles.managementContainer}>
      <button onClick={handleAddNew} className={styles.addNewButton}>
        Add Communication
      </button>

      <Modal isOpen={showModal} onClose={handleClose}>
        <CommunicationMethodForm method={selectedMethod} onClose={handleClose} />
      </Modal>

      {error && <p className={styles.errorMessage}>{error}</p>}

      {loading ? (
        <p className={styles.loadingMessage}>Loading communication methods...</p>
      ) : (
        <div className={styles.cardContainer}>
          {sortedMethods.map((method) => (
            <div key={method.id} className={styles.card}>
              <h3 className={styles.methodName}>{method.name}</h3>
              <p className={styles.methodDescription}>{method.description}</p>
              <span className={styles.methodDetails}>
                Sequence: {method.sequence}
              </span>
              <span className={styles.methodDetails}>
                Mandatory: {method.mandatory ? 'Yes' : 'No'}
              </span>
              <div className={styles.actionButtons}>
                <button
                  onClick={() => handleEdit(method)}
                  className={styles.editButton}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDelete(method.id)}
                  className={styles.deleteButton}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunicationMethodManagement;