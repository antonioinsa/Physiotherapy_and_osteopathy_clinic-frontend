import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './AppointmentsUser.css';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { useNavigate } from 'react-router';
import { appointmentsUser, deleteCurrentAppointment } from '../../services/apiCalls';

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
    const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(0)
    const [successfully, setSuccessfully] = useState('')

    useEffect(() => {
        if (!token && role !== 'user') {
            navigate('/')
        }
    }, [userDataRdx])

    useEffect(() => {
        const getAppointmentsUser = async () => {
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
        getAppointmentsUser()
    }, [token])

    const deleteAppointment = async () => {
        try {
            const id = filteredAppointments[currentAppointmentIndex]?.id

            if (id) {
                const response = await deleteCurrentAppointment(id, token)

                if (response.status === 200) {
                    setSuccessfully(response.data.message)
                    setTimeout(() => {
                        setSuccessfully('')
                        navigate('/home')
                    }, 1000)
                    
                }
            }
        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
    }

    const handleDateChange = (date) => {
        setCurrentAppointmentIndex(0)
        setSelectedDate(date)
    }

    const handleSearch = () => {
        const selectedDateISO = selectedDate.toISOString().split('T')[0]
        const filteredAppointments = appointments.filter((appointment) => {
            const appointmentDateISO = new Date(appointment.date).toISOString().split('T')[0]
            return appointmentDateISO === selectedDateISO
        })

        const sortedAppointmentsOrder = filteredAppointments.sort((a, b) => {
            const timeA = parseInt(a.hour.split(':')[0]) * 60 + parseInt(a.hour.split(':')[1])
            const timeB = parseInt(b.hour.split(':')[0]) * 60 + parseInt(b.hour.split(':')[1])
            return timeB - timeA
        })
        setFilteredAppointments(sortedAppointmentsOrder)
        setCurrentAppointmentIndex(0)
    }

    const handlePrevAppointment = () => {
        if (filteredAppointments.length > 1 && currentAppointmentIndex > 0) {
            setCurrentAppointmentIndex(currentAppointmentIndex - 1)
        }
    }

    const handleNextAppointment = () => {
        if (filteredAppointments.length > 1 && currentAppointmentIndex < filteredAppointments.length - 1) {
            setCurrentAppointmentIndex(currentAppointmentIndex + 1)
        }
    }


    return (
        <div className="appointmentsDesign">
            <div className="calendarUserDesign">
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileContent={({ date, view }) => {
                        const dateISO = date.toISOString().split('T')[0]
                        if (view === 'month' && markedDates.includes(dateISO)) {
                            return <div style={{
                                backgroundColor: 'green',
                                borderRadius: '50%', height: '0.7em', width: '0.7em'
                            }}></div>
                        }
                        return null
                    }}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="cardAppointmentUserDesign">
                {filteredAppointments.length > 0 ? (
                    <div className="appointmentRow">
                        <p>Date: {new Date(filteredAppointments[currentAppointmentIndex].date).toLocaleDateString()}</p>
                        <p>Hour: {filteredAppointments[currentAppointmentIndex].hour}h</p>
                        <p>Service: {filteredAppointments[currentAppointmentIndex].service}</p>
                        <p>Price: {filteredAppointments[currentAppointmentIndex].price}€</p>
                        {filteredAppointments[currentAppointmentIndex].exercises.length > 0 && (
                            <p>Exercises: {filteredAppointments[currentAppointmentIndex].exercises.join(', ')}</p>
                        )}
                    </div>
                ) : (
                    <p>No appointments found for the selected date</p>
                )}
                {filteredAppointments.length > 1 && (
                    <div className='prevNextButtons'>
                        <button onClick={handlePrevAppointment}
                            disabled={currentAppointmentIndex === 0}>Prev</button>
                        <button onClick={handleNextAppointment}
                            disabled={currentAppointmentIndex === filteredAppointments.length - 1}>Next</button>
                    </div>
                )}
                {filteredAppointments.length > 0 && (
                <div className='cancelAppointmentUser'>
                    <button className='cancelButtonAppointmentUser' onClick={deleteAppointment}>Cancel</button>
                </div>
            )}
                <div className="errorMsg">{errorMsg}</div>
                <div className='successfully'>{successfully}</div>
            </div>
        </div>
    )
}
