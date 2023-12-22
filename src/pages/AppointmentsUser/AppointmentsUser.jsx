import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AppointmentsUser.css';
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { useNavigate } from 'react-router';
import { appointmentsUser } from '../../services/apiCalls';

export const AppointmentsUser = () => {
    const userDataRdx = useSelector(userData)
    const token = userDataRdx.credentials
    const role = userDataRdx.role
    const navigate = useNavigate()
    const [appointments, setAppointments] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [markedDates, setMarkedDates] = useState([])
    
    useEffect(() => {
        if (!token && role !== 'user') {
            navigate('/')
        }
    }, [userDataRdx])

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await appointmentsUser(token)
                setAppointments(response.data.data)

                const appointmentDates = response.data.data.map(appointment =>
                    new Date(appointment.date).toISOString().split('T')[0]
                )
                setMarkedDates(appointmentDates)
            } catch (error) {
                setErrorMsg(error.response.data.message)
            }
        }
        fetchAppointments()
    }, [token])

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const handleSearch = () => {
        const selectedDateISO = selectedDate.toISOString().split('T')[0]
        const filteredAppointments = appointments.filter((appointment) => {
            const appointmentDateISO = new Date(appointment.date).toISOString().split('T')[0]
            return appointmentDateISO === selectedDateISO
        })
        setFilteredAppointments(filteredAppointments)
    }


    return (
        <div className="appointmentsDesign">
            <div className="calendarDesign">
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileContent={({ date, view }) => {
                        const dateISO = date.toISOString().split('T')[0]
                        if (view === 'month' && markedDates.includes(dateISO)) {
                            return <div style={{ backgroundColor: 'green', 
                            borderRadius: '50%', height: '0.7em', width: '0.7em' }}></div>
                        }
                        return null
                    }}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="cardAppointmentDesign">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment, index) => (
                        <div key={index} className="appointmentRow">
                            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                            <p>Hour: {appointment.hour}h</p>
                            <p>Service: {appointment.service}</p>
                            <p>Price: {appointment.price}€</p>
                            {appointment.exercises.length > 0 && (
                                <p>Exercises: {appointment.exercises.join(', ')}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No appointments found for the selected date</p>
                )}
            </div>
            <div className="errorMsg">{errorMsg}</div>
        </div>
    )
}
