import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./InvoicesSuperAdmin.css";
import { userData } from '../userSlice';
import { allInvoices } from '../../services/apiCalls';
import { useNavigate } from 'react-router';
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

    const [invoices, setInvoices] = useState([])
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [markedDates, setMarkedDates] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await allInvoices(token)
                setInvoices(response.data.data)

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


    return (
        <div className='superAdminProfileDesign'>
            <div className='invoicesPartDesign'>
                <div className='title'>Invoices</div>
                <div className='cardInvoices'>
                    <VerticalScroll appointments={filteredAppointments} setSortOrder={setSortOrder} />
                </div>
            </div>
            <div className='errorMsg'>{errorMsg}</div>
        </div >
    )
}
