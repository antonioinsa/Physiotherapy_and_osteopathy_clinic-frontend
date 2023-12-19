import './InvoicesUser.css';
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { invoicesUser } from '../../services/apiCalls';

export const InvoicesUser = () => {
    const userDataRdx = useSelector(userData);
    const token = userDataRdx.credentials;
    const role = userDataRdx.role;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token && role !== 'user') {
            navigate('/');
        }
    }, [userDataRdx]);

    const [invoices, setInvoices] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await invoicesUser(token);
                console.log(response.data.data);
                    const sortedInvoices = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setInvoices(sortedInvoices);
                
            } catch (error) {
                setErrorMsg(error.response.data.message);
            }
        };

        fetchData();
    }, [token]);

    const showNextInvoice = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < invoices.length) {
            setCurrentIndex(nextIndex);
        }
    };

    const showPreviousInvoice = () => {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            setCurrentIndex(prevIndex);
        }
    };

    return (
        <div className="invoicesDesign">
            <h2>INVOICES</h2>
            <div className="cardInvoiceDesign">
                {invoices.slice(currentIndex, currentIndex + 1).map((invoice, index) => (
                    <div key={index} className={`appointmentRow ${index % 2 === 0 ? 'even' : 'odd'}`}>
                        <p className="name">{invoice.user}</p>
                        <p>Date: {new Date(invoice.date).toLocaleDateString()}</p>
                        <p>Service: {invoice.service}</p>
                        <p>Price: {invoice.price}€</p>
                        <p>Name: {invoice.name}</p>
                        <p>Last name: {invoice.last_name}</p>
                        <p>Email: {invoice.email}</p>
                        <p>Phone: {invoice.phone}</p>
                        <p>Street: {invoice.street}</p>
                        <p>Door: {invoice.door}</p>
                        <p>ZipCode: {invoice.zipCode}</p>
                        <p>Town: {invoice.town}</p>
                        <p>Country: {invoice.country}</p>
                    </div>
                ))}
            </div>
            <div className="navigation">
                <div className="navigationButtons">
                    <button onClick={showPreviousInvoice} disabled={invoices.length <= 1 || currentIndex === 0}>
                        Previous
                    </button>
                    <button onClick={showNextInvoice} disabled={invoices.length <= 1 || currentIndex + 1 >= invoices.length}>
                        Next
                    </button>
                </div>
                <div className='errorMsg'>{errorMsg}</div>
            </div>
        </div>
    );
};
