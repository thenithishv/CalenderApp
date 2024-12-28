import React, { useState } from 'react';
import styles from './UserPage.module.css';
import Dashboard from '../user/components/Dashboard';
import CalendarView from '../user/components/CalendarView';
import Notifications from '../user/components/Notifications';

function UserPage() {
    const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard'); // State to track active tab

    const toggleNotificationPanel = () => {
        setNotificationPanelOpen(prev => !prev);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab); // Set the active tab based on user selection
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>User Page</h1>
                <button className={styles.notificationButton} onClick={toggleNotificationPanel}>
                    Notifications
                </button>
            </div>
            <div className={styles.tabContainer}>
                <button 
                    className={`${styles.tabButton} ${activeTab === 'dashboard' ? styles.activeTab : ''}`} 
                    onClick={() => handleTabChange('dashboard')}
                >
                    Dashboard
                </button>
                <button 
                    className={`${styles.tabButton} ${activeTab === 'calendar' ? styles.activeTab : ''}`} 
                    onClick={() => handleTabChange('calendar')}
                >
                    Calendar View
                </button>
            </div>
            <div className={styles.content}>
                {activeTab === 'dashboard' ? <Dashboard /> : <CalendarView />}
            </div>
            <div className={`${styles.notificationPanel} ${isNotificationPanelOpen ? styles.open : styles.closed}`}>
                <button className={styles.closeButton} onClick={() => setNotificationPanelOpen(false)}>X</button>
                <Notifications />
            </div>
        </div>
    );
}

export default UserPage;
