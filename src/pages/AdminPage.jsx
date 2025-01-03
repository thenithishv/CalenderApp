import CompanyManagement from '../admin/components/CompanyManagement';
import CommunicationMethodManagement from '../admin/components/CommunicationMethodManagement';
import styles from './AdminPage.module.css';

const AdminPage = ({ onLogout, adminEmail }) => {
    return (
        <div className={styles.adminContainer}>
            <div className={styles.adminHeader}> 
                <h2 className={styles.appHeading}>Calendar Tracking Application</h2>
                <div className={styles.headerInfo}>
                    <h3 className={styles.dashboardHeading}>Admin Dashboard</h3>
                    <div className={styles.userInfo}>
                        <h2 className={styles.loggedInAs}>{adminEmail} </h2>
                        <button className={styles.adminLogoutButton} onClick={onLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className={styles.adminContent}>
                <div className={styles.companyManagement}>
                    <CompanyManagement />
                </div>
                <div className={styles.communicationMethodManagement}>
                    <CommunicationMethodManagement />
                </div>
            </div>  
        </div>
    );
};

export default AdminPage;