import React from 'react';
import styles from './Modal.module.css'; // Import your CSS module for modal styles

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Don't render anything if not open

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    x
                </button>
                {children} 
            </div>
        </div>
    );
};

export default Modal;