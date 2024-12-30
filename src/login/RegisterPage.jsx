import React, { useState } from 'react';
import styles from './RegisterPage.module.css';

const RegisterPage = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        const userData = { name, email, phone, password };

        try {
            const response = await fetch(`http://localhost:3000/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert('User registered successfully!');
                onClose(); // Close modal after successful registration
            } else {
                setError('Error registering. Please try again.');
            }
        } catch (err) {
            setError('Error registering. Please try again.');
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h1 className={styles.registerHeader}>Register</h1>
            <form onSubmit={handleRegister} className={styles.formContainer}>
                <label className={styles.label}>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={styles.inputField}
                    placeholder="Enter your full name"
                />

                <label className={styles.label}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.inputField}
                    placeholder="Enter your email"
                />

                <label className={styles.label}>Phone:</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={styles.inputField}
                    placeholder="Enter your phone number"
                />

                <label className={styles.label}>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.inputField}
                    placeholder="Create a password"
                />

                {error && <p className={styles.errorMessage}>{error}</p>}

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.submitButton}>Register</button>
                    <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
