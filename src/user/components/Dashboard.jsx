import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCompaniesUser,
    fetchCommunicationMethods,
    fetchCommunications,
    markCommunicationAsDoneAsync,
} from '../userSlice';
import CommunicationModal from './CommunicationModal';
import styles from './Dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

function Dashboard() {
    const dispatch = useDispatch();
    const companiesUser = useSelector((state) => state.user.companiesUser);
    const communications = useSelector((state) => state.user.communications);
    const communicationMethods = useSelector((state) => state.user.communicationMethods);

    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCompaniesUser());
        dispatch(fetchCommunications());
        dispatch(fetchCommunicationMethods());
    }, [dispatch]);

    const handleCompanySelect = (companyId) => {
        setSelectedCompanies((prev) =>
            prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId]
        );
    };

    const handleLogCommunication = () => {
        if (selectedCompanies.length === 0) {
            alert('Please select at least one company.');
            return;
        }
        setModalOpen(true);
    };

    const handleMarkAsCompleted = (commId) => {
        dispatch(markCommunicationAsDoneAsync(commId));
    };

    const isToday = (dateString) => {
        const today = new Date();
        const date = new Date(dateString + 'T00:00:00');
        return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        );
    };

    const isFutureDate = (dateString) => {
        const today = new Date();
        const date = new Date(dateString + 'T00:00:00');
        return date > today;
    };

    return (
        <div className={styles.dashboardContainer}>
            <button
                className={styles.logCommunicationButton}
                onClick={handleLogCommunication}
                disabled={selectedCompanies.length === 0}
            >
                Log Communication
            </button>

            <h3 className={styles.companiesTitle}>Companies:</h3>
            <table className={styles.companyTable}>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Company Name</th>
                        <th>Last Five Communications</th>
                        <th>Next Scheduled Communication</th>
                    </tr>
                </thead>
                <tbody>
                    {companiesUser.map((company) => (
                        <tr key={company.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    className={styles.companyCheckbox}
                                    checked={selectedCompanies.includes(company.id)}
                                    onChange={() => handleCompanySelect(company.id)}
                                />
                            </td>
                            <td>{company.name}</td>
                            <td>
                                {communications
                                    .filter((comm) => comm.companyId === company.id)
                                    .sort(
                                        (a, b) =>
                                            new Date(b.communication.date) -
                                            new Date(a.communication.date)
                                    )
                                    .slice(0, 5)
                                    .map((comm) => (
                                        <div
                                            key={comm.id}
                                            className={styles.communicationItem}
                                        >
                                            <span
                                                className={
                                                    comm.communication.done
                                                        ? styles.completed
                                                        : styles.due
                                                }
                                            >
                                                {comm.communication.type} on{' '}
                                                {comm.communication.date}{' '}
                                                {comm.communication.done
                                                    ? '(Completed)'
                                                    : '(Due)'}
                                            </span>
                                            {!comm.communication.done &&
                                                !isFutureDate(comm.communication.date) && (
                                                    <button
                                                        onClick={() =>
                                                            handleMarkAsCompleted(comm.id)
                                                        }
                                                        className={
                                                            styles.markCompletedButton
                                                        }
                                                    >
                                                        Mark as{' '}
                                                        <FontAwesomeIcon
                                                            icon={faCheckCircle}
                                                        />
                                                    </button>
                                                )}
                                        </div>
                                    ))}
                            </td>
                            <td>
                                {communications
                                    .filter(
                                        (comm) =>
                                            comm.companyId === company.id &&
                                            (isToday(comm.communication.date) ||
                                                new Date(comm.communication.date) >
                                                    new Date()) &&
                                            !comm.communication.done
                                    )
                                    .sort(
                                        (a, b) =>
                                            new Date(a.communication.date) -
                                            new Date(b.communication.date)
                                    )
                                    .map((comm) => (
                                        <div key={comm.id}>
                                            {comm.communication.type} scheduled for{' '}
                                            {comm.communication.date}
                                        </div>
                                    ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalOpen && (
                <CommunicationModal
                    selectedCompanies={selectedCompanies}
                    onClose={() => setModalOpen(false)}
                    communicationMethods={communicationMethods}
                />
            )}
        </div>
    );
}

export default Dashboard;
