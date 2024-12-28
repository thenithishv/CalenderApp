import React, { useState } from 'react';
import styles from './LoginPage.module.css';

function LoginPage({ setCurrentPage, setUserLoggedIn, setAdminLoggedIn }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isAdmin ? 'admins' : 'users';
    try {
      const response = await fetch(`http://localhost:5000/${endpoint}?email=${email}&password=${password}`);
      const data = await response.json();
      if (data.length > 0) {
        alert(`${isAdmin ? 'Admin' : 'User'} logged in successfully!`);
        if (isAdmin) {
          setAdminLoggedIn(true);
        } else {
          setUserLoggedIn(true);
        }
      } else {
        setError('Invalid credentials.');
      }
    } catch (err) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.toggleButtons}>
        <button
          onClick={() => setIsAdmin(false)}
          className={!isAdmin ? styles.activeButton : styles.button}
        >
          User Login
        </button>
        <button
          onClick={() => setIsAdmin(true)}
          className={isAdmin ? styles.activeButton : styles.button}
        >
          Admin Login
        </button>
      </div>
      <form onSubmit={handleLogin} className={styles.form}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
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
          Login
        </button>
      </form>
      <p>
        New user or admin?{' '}
        <button onClick={() => setCurrentPage('register')} className={styles.registerButton}>
          Register here
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
