import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from './loginSlice';
import styles from './LoginPage.module.css';

function LoginPage({ setCurrentPage, onUserLogin, onAdminLogin, openRegisterModal }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginRequest());

        const endpoint = isAdmin ? 'admins' : 'users';
        try {
            const response = await fetch(`https://json-server-main-fc76.onrender.com/${endpoint}?email=${email}&password=${password}`);
            const data = await response.json();

            if (data.length > 0) {
                dispatch(loginSuccess({ user: data[0], isAdmin }));
                alert(`${isAdmin ? 'Admin' : 'User'} logged in successfully!`);
                if (isAdmin) {
                    onAdminLogin(data[0].email);
                } else {
                    onUserLogin();
                }
            } else {
                dispatch(loginFailure('Invalid credentials.'));
                alert('Invalid credentials.');
            }
        } catch (err) {
            dispatch(loginFailure('Error logging in. Please try again.'));
            alert('Error logging in. Please try again.');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.appTitle}>Calendar Tracking Application</h2>
            <h4 className={styles.loginHeader}>Login</h4>
            <div className={styles.buttonContainer}>
                <button 
                    className={styles.userLoginButton} 
                    onClick={() => setIsAdmin(false)} 
                    disabled={!isAdmin}
                >
                    User Login
                </button>
                <button 
                    className={styles.adminLoginButton} 
                    onClick={() => setIsAdmin(true)} 
                    disabled={isAdmin}
                >
                    Admin Login
                </button>
            </div>
            <form className={styles.formContainer} onSubmit={handleLogin}>
                <label>
                    <span className={styles.emailLabel}>Email:</span>
                    <input 
                        type="email" 
                        className={styles.emailInputField}
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder={isAdmin ? "Admin login" : "User email"}
                    />
                </label>
                <label>
                   <span className={styles.passwordLabel}>Password:</span>
                    <input 
                        type="password" 
                        className={styles.passwordInputField}
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        placeholder="Password"
                    />
                </label>
                <button type="submit" className={styles.submitButton}>Login</button>
            </form>
            <p className={styles.registerLink}>
                New user?{' '}
                <button onClick={openRegisterModal} className={styles.registerButton}>
                    Register here
                </button>
            </p>
        </div>
    );
}

export default LoginPage;
