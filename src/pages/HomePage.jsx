import { useEffect, useState } from 'react';
import LoginPage from '../login/LoginPage';
import UserPage from './UserPage';
import AdminPage from './AdminPage';
import RegisterPage from '../login/RegisterPage';
import styles from './HomePage.module.css';

function HomePage() {
    const [currentPage, setCurrentPage] = useState('login');
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [adminLoggedIn, setAdminLoggedIn] = useState(false);
    const [adminEmail, setAdminEmail] = useState('');
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    
    useEffect(() => {
        const user = localStorage.getItem('userLoggedIn');
        const admin = localStorage.getItem('adminLoggedIn');
        const email = localStorage.getItem('adminEmail');

        if (user) {
            setUserLoggedIn(true);
            setCurrentPage('user');
        } else if (admin) {
            setAdminLoggedIn(true);
            setAdminEmail(email);
            setCurrentPage('admin');
        }
    }, []);

    const handleUserLogin = () => {
        setUserLoggedIn(true);
        localStorage.setItem('userLoggedIn', 'true');
        setCurrentPage('user'); // Immediately route to UserPage
    };

    const handleAdminLogin = (email) => {
        setAdminEmail(email);
        setAdminLoggedIn(true);
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);
        setCurrentPage('admin'); // Immediately route to AdminPage
    };

    const handleLogout = () => {
        setUserLoggedIn(false);
        setAdminLoggedIn(false);
        setAdminEmail('');
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminEmail');
        setCurrentPage('login'); // Redirect to login page on logout
    };

    useEffect(() => {
        // Disable scrolling on modal open
        if (isRegisterModalOpen) {
            document.body.classList.add(styles.homePage__disableScrolling);
        } else {
            document.body.classList.remove(styles.homePage__disableScrolling);
        }
    }, [isRegisterModalOpen]);

    return (
        <div className={styles.homePage}>
            <div className={styles.rightContent}>
                {currentPage === 'login' && (
                    <LoginPage 
                        setCurrentPage={setCurrentPage}
                        onUserLogin={handleUserLogin} 
                        onAdminLogin={handleAdminLogin} 
                        openRegisterModal={() => setIsRegisterModalOpen(true)}
                    />
                )}

                {isRegisterModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <RegisterPage 
                                onClose={() => setIsRegisterModalOpen(false)}
                            />
                        </div>
                    </div>
                )}

                {currentPage === 'user' && <UserPage onLogout={handleLogout} />}
                {currentPage === 'admin' && 
                    <AdminPage 
                        onLogout={handleLogout} 
                        adminEmail={adminEmail} 
                    />
                }
            </div>
        </div>
    );
}

export default HomePage;
