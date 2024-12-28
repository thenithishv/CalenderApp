import React from 'react';
import { useSelector } from 'react-redux';

const Notifications = () => {
    const communications = useSelector((state) => state.user.communications);
    const companiesUser = useSelector((state) => state.user.companiesUser);
    
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // Filter overdue communications
    const overdueCommunications = communications.filter(comm => 
        new Date(comm.communication.date) < new Date() && !comm.communication.done
    );

    // Filter today's communications
    const todaysCommunications = communications.filter(comm => 
        comm.communication.date === today && !comm.communication.done
    );

    return (
        <div>
            <h2>Notifications</h2>

            {/* Overdue Communications */}
            <div>
                <h3>Overdue Communications ({overdueCommunications.length})</h3>
                {overdueCommunications.length > 0 ? (
                    overdueCommunications.map((comm, index) => {
                        const company = companiesUser.find(company => company.id === comm.companyId);
                        return (
                            <div key={index}>
                                <strong>{company ? company.name : 'Unknown Company'}</strong>: {comm.communication.type} was due on {comm.communication.date}.
                            </div>
                        );
                    })
                ) : (
                    <p>No overdue communications.</p>
                )}
            </div>

            {/* Today's Communications */}
            <div>
                <h3>Today's Communications ({todaysCommunications.length})</h3>
                {todaysCommunications.length > 0 ? (
                    todaysCommunications.map((comm, index) => {
                        const company = companiesUser.find(company => company.id === comm.companyId);
                        return (
                            <div key={index}>
                                <strong>{company ? company.name : 'Unknown Company'}</strong>: {comm.communication.type} is scheduled for today.
                            </div>
                        );
                    })
                ) : (
                    <p>No communications scheduled for today.</p>
                )}
            </div>
        </div>
    );
};

export default Notifications;
