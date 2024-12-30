import CompanyManagement from '../admin/components/CompanyManagement';
import CommunicationMethodManagement from '../admin/components/CommunicationMethodManagement';
import styles from './AdminPage.module.css';

const AdminPage = ({ onLogout, adminEmail }) => { // Accept onLogout and adminEmail as props
    return (
        <div className={styles.container}>
            <div className={styles.header}> 
                <h2 className={styles.dashboardHeading}>Admin Dashboard</h2>
                <div className={styles.userInfo}>
                    <h2 className={styles.loggedInAs}>Logged In As: {adminEmail}</h2>
                    <button className={styles.adminLogoutButton} onClick={onLogout}>Logout</button>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <CompanyManagement />
                </div>
                <div className={styles.right}>
                    <CommunicationMethodManagement />
                </div>
            </div>  
        </div>
    );
};

export default AdminPage;
