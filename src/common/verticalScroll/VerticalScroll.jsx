import React, { useState } from 'react';
import './VerticalScroll.css';

const VerticalScroll = ({ appointments }) => {
    const [sortOrder, setSortOrder] = useState('asc')

    const handleSortOrderChange = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
    }

    const filteredAppointments = appointments.filter(appointment => {
        return true
    })

    const sortedAppointments = appointments.slice().sort((a, b) => {
        const compareValue = sortOrder === 'asc' ? 1 : -1;
        return compareValue * (a.hour - b.hour);
    });
    return (
        <div className='vertical-scroll'>
            <div className='sort-order-button' onClick={handleSortOrderChange}>
                Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </div>
            <div className='scroll-container'>
                {sortedAppointments.map((appointment, index) => (
                    <div key={index} className='appointment-row'>
                        <div className='appointments'>
                            <div className='appointment-item'>
                                <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                                <p>Hour: {appointment.hour}h</p>
                                <p>Appointment number: {appointment.apointment_number}</p>
                                <p>Name: {appointment.name}</p>
                                <p>Last Name: {appointment.last_name}</p>
                                <p>Email: {appointment.email}</p>
                                <p>Phone: {appointment.phone}</p>
                                <p>Service: {appointment.service}</p>
                                <p>Worker Name: {appointment.name_worker}</p>
                                <p>Worker Last name: {appointment.lastName_worker}</p>
                                <p>Price: {appointment.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VerticalScroll