import { useState } from 'react';
import styles from './UserPage.module.css';
import Dashboard from '../user/components/Dashboard';
import CalendarView from '../user/components/CalendarView';
import Notifications from '../user/components/Notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendarDays, faBarChart, faRectangleXmark } from '@fortawesome/free-regular-svg-icons';

function UserPage({ onLogout }) {
    const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [notifications, setNotifications] = useState([
        // Add some mock notifications for demo
        { id: 1, message: "New communication task scheduled" },
        { id: 2, message: "Reminder: Follow up with Company A" },
        { id: 3, message: "Meeting scheduled with Company B" },
    ]);

    const toggleNotificationPanel = () => {
        setNotificationPanelOpen((prev) => !prev);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const unreadCount = notifications.length; // Count unread notifications

    return (
        <div className={styles.userPageContainer}>
            <header className={styles.userPageHeader}>
                <h1 className={styles.userPageTitle}>User Dashboard</h1>
                <div className={styles.headerButtons}>
                    {/* Notification Button with Badge */}
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
            </header>

            {/* Fixed Tab Buttons */}
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

            {/* Content */}
            <main className={styles.userPageContent}>
                {activeTab === 'dashboard' ? <Dashboard /> : <CalendarView />}
            </main>

            {/* Notification Panel */}
            <div
                className={`${styles.notificationPanel} ${isNotificationPanelOpen ? styles.open : styles.closed}`}
            >
                <button className={styles.closeNotificationButton} onClick={() => setNotificationPanelOpen(false)}>
                    <FontAwesomeIcon icon={faRectangleXmark} />
                </button>
                <Notifications />
            </div>
        </div>
    );
}

export default UserPage;
