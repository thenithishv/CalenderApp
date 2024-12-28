// CalendarView Component
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompaniesUser, fetchCommunications } from '../userSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './CalendarView.module.css';
import { parseISO, isSameDay } from 'date-fns';

const CalendarView = () => {
    const dispatch = useDispatch();
    const companiesUser = useSelector((state) => state.user.companiesUser);
    const communicationsData = useSelector((state) => state.user.communications);
    const [date, setDate] = useState(new Date());
    const [communications, setCommunications] = useState([]);
    const [selectedDateCommunications, setSelectedDateCommunications] = useState([]);

    useEffect(() => {
        dispatch(fetchCompaniesUser());
        dispatch(fetchCommunications());
    }, [dispatch]);

    useEffect(() => {
        const filteredCommunications = [];

        if (Array.isArray(companiesUser)) {
            companiesUser.forEach(company => {
                if (Array.isArray(communicationsData)) {
                    communicationsData.forEach(comm => {
                        if (comm.companyId === company.id) {
                            filteredCommunications.push({
                                companyName: company.name,
                                type: comm.communication.type,
                                date: comm.communication.date,
                                notes: comm.communication.notes,
                                done: comm.communication.done,
                                id: comm.id
                            });
                        }
                    });
                }
            });
        }

        setCommunications(filteredCommunications);
    }, [companiesUser, communicationsData]);

    const handleDateChange = (newDate) => {
        setDate(newDate);

        const filteredForSelectedDate = communications.filter(comm => {
            const commDate = parseISO(comm.date + "T00:00:00");
            return isSameDay(commDate, newDate);
        });

        setSelectedDateCommunications(filteredForSelectedDate);
    };

    const tileClassName = ({ date }) => {
        return communications.some(comm => isSameDay(parseISO(comm.date + "T00:00:00"), date))
            ? styles.highlighted
            : null;
    };

    return (
        <div className={styles.container}>
            <div className={styles.calendarContainer}>
                <Calendar 
                    onChange={handleDateChange} 
                    value={date} 
                    tileClassName={tileClassName} 
                />
            </div>
            <div className={styles.communicationsContainer}>
                <h3>Communications on {date.toDateString()}:</h3>
                {selectedDateCommunications.length > 0 ? (
                    <ul>
                        {selectedDateCommunications.map((comm) => (
                            <li key={comm.id} className={styles.communicationItem} title={comm.notes}>
                                <strong>{comm.companyName}</strong>: {comm.type} - {comm.notes}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No communications found for this date.</p>
                )}
            </div>
        </div>
    );
};

export default CalendarView;