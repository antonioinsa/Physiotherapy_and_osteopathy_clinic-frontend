import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./NewAppointment.css";
import { validator } from "../../services/useful";
import 'react-calendar/dist/Calendar.css';
import { newAppointment } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import Calendar from 'react-calendar';

export const NewAppointment = () => {
    const userDataRdx = useSelector(userData)
    const token = userDataRdx.credentials
    const role = userDataRdx.role
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const [successfully, setSuccessfully] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())

    useEffect(() => {
        if (!token || role !== 'user') {
            navigate('/')
        }
    }, [token, role])

    const [appointment, setAppointment] = useState({
        service: '',
        hour: ''
    })


    const [appointmentError, setAppointmentError] = useState({
        serviceError: '',
        hourError: ''
    })

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6
    } // Sunday (0) - Saturday (6)

    const handlerAppointment = (e) => {
        setAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const errorCheck = (e) => {
        let error = validator(e.target.name, e.target.value)
        setAppointmentError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }))
    }

    const newAppointmentClient = async () => {
        try {
            const formattedDate = new Intl.DateTimeFormat('es-ES').format(selectedDate)
            const changeFormateDate = formattedDate.split('/').join('-')

            const body = {
                date: changeFormateDate,
                hour: appointment.hour,
                service: appointment.service,
            }
            
            const response = await newAppointment(token, body)
            setErrorMsg('')
            setAppointment(response.data.data)
            setSuccessfully(response.data.message)

            setTimeout(() => {
                setSuccessfully(response.data.message)
                navigate('/')
            }, 500)

        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
    }

    const serviceOptions = [
        { value: '', label: 'Select service' },
        { value: 'physiotherapy', label: 'Physiotherapy' },
        { value: 'osteopathy', label: 'Osteopathy' }
    ]

    const hourOptions = [
        { value: '', label: 'Select hour' },
        { value: '09:00', label: '09:00' },
        { value: '10:15', label: '10:15' },
        { value: '11:30', label: '11:30' },
        { value: '12:45', label: '12:45' },
        { value: '16:00', label: '16:00' },
        { value: '17:15', label: '17:15' },
        { value: '18:30', label: '18:30' }
    ]

    return (
        <div className="newAppointmentDesign">
            <div className="inputsNewAppointmentDesign">
                <div className="createAppointmentDesign">
                    <div className="calendar">
                        <Calendar
                            onChange={(date) => handleDateChange(date)}
                            value={selectedDate}
                            minDate={new Date()}
                            tileDisabled={({ date }) => isWeekend(date)}
                        />
                    </div>
                    <div className="inputSelects">
                        <div>
                            <select
                                className='selectDesign'
                                name='service'
                                value={appointment.service}
                                onChange={handlerAppointment}
                                onBlur={errorCheck}
                            >
                                {serviceOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select
                                className='selectDesign'
                                name='hour'
                                value={appointment.hour}
                                onChange={handlerAppointment}
                                onBlur={errorCheck}
                            >
                                {hourOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="buttonAndMessage">
                    <div className='buttonCreate' onClick={newAppointmentClient}>Create</div>
                    {successfully && <div className='successMsg'>{successfully}</div>}
                    {errorMsg && <div className='errorMsg'>{errorMsg}</div>}
                </div>
            </div>
        </div>
    )
}
