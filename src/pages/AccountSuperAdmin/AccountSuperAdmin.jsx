import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./AccountSuperAdmin.css";
import { userData } from '../userSlice';
import { allAppointments } from '../../services/apiCalls';
import { useNavigate } from 'react-router';
import Calendar from 'react-calendar';
import VerticalScroll from '../../common/verticalScroll/VerticalScroll';

export const AccountSuperAdmin = () => {

    const userDataRdx = useSelector(userData)
    const token = userDataRdx.credentials
    const role = userDataRdx.role
    const navigate = useNavigate()

    useEffect(() => {
        if (!token || role !== 'superAdmin') {
            navigate('/')
        }
    }, [token, role])

    const [appointments, setAppointments] = useState([])
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [markedDates, setMarkedDates] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await allAppointments(token)
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
        const sortedAppointments = filteredAppointments.slice().sort((a, b) => a.hour - b.hour)
        setFilteredAppointments(sortOrder === 'asc' ? sortedAppointments : sortedAppointments.reverse())
    }


    const goToEditDate = () => {
        navigate('/account')
    }



    return (
        <div className='superAdminProfileDesign'>
            <div className='dinamicPartDesign'>
                <div className='title'>Administration</div>
                <div className='calendar'>
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
                    <button className='searchButton' onClick={handleSearch}>Search</button>
                </div>
                <div className='cardAppointments'>
                    <VerticalScroll appointments={filteredAppointments} setSortOrder={setSortOrder} />
                </div>
            </div>
            <div className='staticPartDesign'>
                <div className='ButtonsForOptions'>
                    <div className='saButton'>Manage workers</div>
                    <div className='saButton'>Manage clients</div>
                    <div className='saButton'>Appointments</div>
                    <div className='saButton'>Invoices</div>
                    <div className='saButton' onClick={goToEditDate}>Edit my date</div>
                </div>
            </div>
        </div>

    )

}