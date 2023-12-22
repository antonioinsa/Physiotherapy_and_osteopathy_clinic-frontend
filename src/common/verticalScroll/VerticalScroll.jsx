import React, { useState } from 'react';
import './VerticalScroll.css';

const VerticalScroll = ({ appointments }) => {
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSortOrderChange = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const sortedAppointments = appointments
        .slice()
        .sort((a, b) => {
            const compareValue = sortOrder === 'asc' ? 1 : -1;
            return compareValue * (parseInt(a.hour, 10) - parseInt(b.hour, 10));
        });

    return (
        <div className='verticalScroll'>
            <div className='headerSortOrderButton'>
                <div className='sortOrderButton' onClick={handleSortOrderChange}>
                    Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </div>
            </div>
            <div className='scrollContainer'>
                {sortedAppointments.length < 1 ? (
                    <p>No appointments available for the selected date</p>
                ) : (
                    sortedAppointments.map((appointment, index) => (
                        <div key={index} className='appointmentRow'>
                            <div className='appointments'>
                                <div className='appointmentItem'>
                                    <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                                    <p>Hour: {appointment.hour}h</p>
                                    <p className='outstanding'>Appointment number: {appointment.apointment_number}</p>
                                    <p>Name: {appointment.name}</p>
                                    <p>Last Name: {appointment.last_name}</p>
                                    <p>Email: {appointment.email}</p>
                                    <p>Phone: {appointment.phone}</p>
                                    <p>Service: {appointment.service}</p>
                                    <p className='outstanding'>Worker Name: {appointment.name_worker}</p>
                                    <p className='outstanding'>Worker Last name: {appointment.lastName_worker}</p>
                                    <p>Price: {appointment.price}€</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default VerticalScroll
