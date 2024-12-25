import CompanyManagement from '../admin/components/CompanyManagement';
import styles from './AdminPage.module.css';
const AdminPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}> 
                <h1 className={styles.heading}>Admin Dashboard</h1>
           </div>
           <div className={styles.content}>
                <div className={styles.left}>
                    <CompanyManagement />
                </div>
                <div className={styles.right}>
                    <CompanyManagement />
                </div>
            </div>
           
        </div>
    );
};

export default AdminPage;
