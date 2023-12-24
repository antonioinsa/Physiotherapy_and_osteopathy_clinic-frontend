import React, { useEffect, useState } from 'react';
import './InvoicesSuperAdmin.css';
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { allInvoices } from '../../services/apiCalls';
import { useNavigate } from 'react-router';

export const InvoicesSuperAdmin = () => {
    const userDataRdx = useSelector(userData)
    const token = userDataRdx.credentials
    const role = userDataRdx.role
    const navigate = useNavigate()
    const [invoices, setInvoices] = useState([])
    const [filteredInvoices, setFilteredInvoices] = useState([])
    const [selectedYear, setSelectedYear] = useState('all')
    const [availableYears, setAvailableYears] = useState(['all'])
    const [selectedMonth, setSelectedMonth] = useState('all')
    const [selectedDay, setSelectedDay] = useState('all')
    const [sortOrder, setSortOrder] = useState('asc')
    const [errorMsg, setErrorMsg] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [startIndex, setStartIndex] = useState(0)

    const itemsPerPage = 1
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        if (!token || role !== 'superAdmin') {
            navigate('/')
        }
    }, [token, role])

    useEffect(() => {
        setStartIndex((currentPage - 1) * itemsPerPage);
    }, [currentPage, itemsPerPage])


    useEffect(() => {
        const getInvoices = async () => {
            try {
                const response = await allInvoices(token)
                setInvoices(response.data.data)
                const years = [...new Set(response.data.data.map(invoice =>
                    new Date(invoice.date).getFullYear()))]
                setAvailableYears(['all', ...years.map(year => year.toString())])
            } catch (error) {
                setErrorMsg(error.response.data.message)
            }
        }
        getInvoices()
    }, [token])

    useEffect(() => {
        let filtered = invoices
        if (selectedYear !== 'all') {
            filtered = filtered.filter(
                (invoice) => new Date(invoice.date).getFullYear().toString() === selectedYear
            )
        }
        if (selectedMonth !== 'all') {
            filtered = filtered.filter(
                (invoice) => new Date(invoice.date).getMonth() + 1 === parseInt(selectedMonth)
            )
        }
        if (selectedDay !== 'all') {
            filtered = filtered.filter(
                (invoice) => new Date(invoice.date).getDate() === parseInt(selectedDay)
            )
        }

        const sortedInvoices = [...filtered].sort((a, b) => a.date.localeCompare(b.date))
        setFilteredInvoices(sortOrder === 'asc' ? sortedInvoices : sortedInvoices.reverse())
    }, [invoices, selectedYear, selectedMonth, selectedDay, sortOrder])

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value)
        setSelectedMonth('all')
        setSelectedDay('all')
    }

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value)
        setSelectedDay('all')
    }

    const handleDayChange = (e) => {
        setSelectedDay(e.target.value)
    }

    const months = [
        { value: 'all', label: 'All' },
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ]

    const daysInMonth = (month) => {
        switch (month) {
            case '1': // January
            case '3': // March
            case '5': // May
            case '7': // July
            case '8': // August
            case '10': // October
            case '12': // December
                return Array.from({ length: 31 }, (_, i) => i + 1)
            case '2': // February
                return Array.from({ length: 28 }, (_, i) => i + 1)
            case '4': // April
            case '6': // June
            case '9': // September
            case '11': // November
                return Array.from({ length: 30 }, (_, i) => i + 1)
            default:
                return []
        }
    }


    return (
        <div className='superAdminInvoicesDesign'>
            <div className='invoicesPartDesign'>
                <div className='titleInvoices'>Invoices</div>
                <div>
                    <label className='select'>Year:</label>
                    <select
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        {availableYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='select'>Month:</label>
                    <select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    >
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='select'>Day:</label>
                    <select
                        value={selectedDay}
                        onChange={handleDayChange}>
                        <option value='all'>All</option>
                        {daysInMonth(selectedMonth).map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button className='button' onClick={() =>
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                        Change Order
                    </button>
                </div>
                <div className='cardInvoices'>
                    {currentItems.length === 0 ? (
                        <p className='noInvoicesMessage'>No invoices to show</p>
                    ) : (
                        currentItems.map((invoice) => (
                            <div key={invoice.id} className='invoiceItem'>
                                <div className='invoices'>
                                    <p>Date: {new Date(invoice.date).toLocaleDateString()}</p>
                                    <p>Service: {invoice.service}</p>
                                    <p>Price: {invoice.price}€</p>
                                    <p>Name: {invoice.name}</p>
                                    <p>Last Name: {invoice.last_name}</p>
                                    <p>Email: {invoice.email}</p>
                                    <p>Phone: {invoice.phone}</p>
                                    <p>Street: {invoice.street}</p>
                                    <p>Door: {invoice.door}</p>
                                    <p>ZipCode: {invoice.zipCode}</p>
                                    <p>Town: {invoice.town}</p>
                                    <p>Country: {invoice.country}</p>
                                </div>
                                <div className='pagination'>
                                    <div className='paginationButtons'>
                                        <div className='progressBar'>
                                            <div
                                                className='progress'
                                                style={{ width: `${(currentPage / totalPages) * 100}%` }}
                                            />
                                        </div>
                                        <div className='buttons'>
                                            <button
                                                className='fisicsButtons'
                                                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </button>
                                            <button
                                                className='fisicsButtons'
                                                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className='errorMsg'>{errorMsg}</div>
        </div>
    )
}
