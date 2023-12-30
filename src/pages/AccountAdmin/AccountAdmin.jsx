import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./AccountAdmin.css";
import { userData } from '../userSlice';
import { accountUser, appointmentsAdmin } from '../../services/apiCalls';
import { useNavigate } from 'react-router';
import Calendar from 'react-calendar';
import {worker_face} from './src/images/Chema_face.png'


export const AccountAdmin = () => {

    const userDataRdx = useSelector(userData)
    const token = userDataRdx.credentials
    const role = userDataRdx.role
    const navigate = useNavigate()
    const [appointments, setAppointments] = useState([])
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [markedDates, setMarkedDates] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (!token || role !== 'admin') {
            navigate('/')
        }
    }, [token, role])

    const [worker, setWorker] = useState({
        name: userDataRdx.credentials.name,
        lastName: userDataRdx.credentials.lastName,
        specialty: userDataRdx.credentials.specialty,
        email: userDataRdx.credentials.email,
    })


    useEffect(() => {
        const getAccountAdmin = async () => {
            try {
                const response = await accountUser(token)
                setWorker(response.data.data)
            } catch (error) {
                setErrorMsg(error.response.data.message)
            }
        }
        getAccountAdmin()
    }, [token])

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const response = await appointmentsAdmin(token)
                setAppointments(response.data.data)

                const appointmentDates = response.data.data.map(appointment =>
                    new Date(appointment.date).toISOString().split('T')[0]
                )
                setMarkedDates(appointmentDates)
            } catch (error) {
                setErrorMsg(error.response.data.message)
            }
        }
        getAppointments()
    }, [token])

    const appointmentsPerPage = 1
    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
    const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const goToPrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

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

    const goToEditDate = () => {
        navigate('/account')
    }


    return (
        <div className='accountAdminDesign'>
            <div className='columnCardWorkerDesign'>
                <div className='cardWorkerDesign'>
                    <div className='profilePicture'>
                        <img src={worker_face} alt="face" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className='profile'>
                        <p>{worker.name}</p>
                        <p>{worker.lastName}</p>
                        <p>{worker.specialty}</p>
                        <p>{worker.email}</p>
                    </div>
                    <div className='editButton' onClick={goToEditDate}>Edit</div>
                </div>
            </div>
            <div className='calendarDesign'>
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
                <button className='buttonSearchAdmin' onClick={handleSearch}>Search</button>
            </div>

            <div className='cardAppointmentWorkerDesign'>
                <div className='appointmentsToMe'>
                    {currentAppointments.length > 0 ? (
                        currentAppointments.map((appointment, index) => (
                            <div key={index} className="appointmentRow">
                                <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                                <p>Hour: {appointment.hour}h</p>
                                <p>Name: {appointment.name}</p>
                                <p>Last Name: {appointment.last_name}</p>
                                <p>Email: {appointment.email}</p>
                                <p>Phone: {appointment.phone}</p>
                                {appointment.exercises.length > 0 && (
                                    <p>Exercises: {appointment.exercises.join(', ')}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No appointments found for the selected date</p>
                    )}
                </div>
                {filteredAppointments.length > appointmentsPerPage && (
                    <div className='pagButtons'>
                        <button onClick={goToPrevPage} disabled={currentPage === 1}>Prev</button>
                        <span>{`Page ${currentPage} of ${totalPages}`}</span>
                        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
                    </div>
                 )}
            </div>
        </div>


    )
}
