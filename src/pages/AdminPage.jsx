import CompanyManagement from '../admin/components/CompanyManagement';
import CommunicationMethodManagement from '../admin/components/CommunicationMethodManagement';
import styles from './AdminPage.module.css';

const AdminPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}> 
                <h1 className={styles.appName}>Calendar Application</h1>
                <h2 className={styles.heading}>Admin Dashboard</h2>
                <h2 className={styles.heading}>Logged In AS </h2>
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
