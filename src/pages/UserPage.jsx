import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunications } from "../user/userSlice";
import styles from './UserPage.module.css';
import Dashboard from '../user/components/Dashboard';
import CalendarView from '../user/components/CalendarView';
import Notifications from '../user/components/Notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendarDays, faBarChart, faRectangleXmark } from '@fortawesome/free-regular-svg-icons';

function UserPage({ onLogout, userEmail }) {
    const dispatch = useDispatch();
    const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');

    // Fetch communications from Redux store
    const communications = useSelector((state) => state.user.communications);

    // Calculate today's date
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Count unread notifications (overdue + today's)
    const overdueCommunications = communications.filter(comm => 
        new Date(comm.communication.date) < new Date() && !comm.communication.done
    );

    const todaysCommunications = communications.filter(comm => 
        comm.communication.date === today && !comm.communication.done
    );

    const unreadCount = overdueCommunications.length + todaysCommunications.length; // Total unread notifications

    useEffect(() => {
        dispatch(fetchCommunications()); // Fetch communications when component mounts
    }, [dispatch]);

    const toggleNotificationPanel = () => {
        setNotificationPanelOpen((prev) => !prev);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={styles.userPageContainer}>
            <header className={styles.userPageHeader}>
                <h2 className={styles.appTitle}>Calendar Tracking Application</h2>
                <div className={styles.headerTitles}>
                    <h3 className={styles.userPageTitle}>User Dashboard</h3>
                    <div className={styles.headerButtons}>
                        <span className={styles.signedInUser}>{userEmail}</span> 
                        <button className={styles.notificationButton} onClick={toggleNotificationPanel}>
                            <FontAwesomeIcon icon={faBell} />
                            {unreadCount > 0 && (
                                <span className={styles.notificationBadge}>{unreadCount}</span>
                            )}
                        </button>
                        <button className={styles.logoutButton} onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className={styles.tabButtonsContainer}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'dashboard' ? styles.activeTab : ''}`}
                    onClick={() => handleTabChange('dashboard')}
                >
                    <FontAwesomeIcon icon={faBarChart} /> Dashboard
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'calendar' ? styles.activeTab : ''}`}
                    onClick={() => handleTabChange('calendar')}
                >
                    <FontAwesomeIcon icon={faCalendarDays} /> Calendar View
                </button>
            </div>

            <main className={styles.userPageContent}>
                {activeTab === 'dashboard' ? <Dashboard /> : <CalendarView />}
            </main>

            <div
                className={`${styles.notificationPanel} ${isNotificationPanelOpen ? styles.open : styles.closed}`}
            >
                
                <Notifications />
            </div>
        </div>
    );
}

export default UserPage;
