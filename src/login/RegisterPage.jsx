import React, { useState } from 'react';
import styles from './RegisterPage.module.css';

function RegisterPage({ setCurrentPage }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const userData = { email, Name: name, Phone: phone, password };
    const endpoint = isAdmin ? 'admins' : 'users';

    try {
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert(`${isAdmin ? 'Admin' : 'User'} registered successfully!`);
        setCurrentPage('login'); // Switch to login after registration
      } else {
        setError('Error registering. Please try again.');
      }
    } catch (err) {
      setError('Error registering. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <div className={styles.toggleButtons}>
        <button
          onClick={() => setIsAdmin(false)}
          className={!isAdmin ? styles.activeButton : styles.button}
        >
          User Registration
        </button>
        <button
          onClick={() => setIsAdmin(true)}
          className={isAdmin ? styles.activeButton : styles.button}
        >
          Admin Registration
        </button>
      </div>
      <form onSubmit={handleRegister} className={styles.form}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
        </label>
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.input} required />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={() => setCurrentPage('login')} className={styles.registerButton}>
          Login here
        </button>
      </p>
    </div>
  );
}

export default RegisterPage;
