import axios from 'axios';

export const loginUsers = async (body) => {
    return await axios.post(`http://localhost:3000/login`, body);
}

export const registerUsers = async (body) => {
    return await axios.post(`http://localhost:3000/register`, body);

}

export const accountUser = async (token) => {
    return await axios.get(`http://localhost:3000/account`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateUser = async (token, body) => {
    return await axios.put(`http://localhost:3000/update`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updatePasswordUser = async (token, body) => {
    return await axios.put(`http://localhost:3000/updatePassword`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const invoicesUser = async (token) => {
    return await axios.get(`http://localhost:3000/myInvoices`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const appointmentsUser = async (token) => {
    return await axios.get(`http://localhost:3000/getAppointments`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const appointmentsAdmin = async (token) => {
    return await axios.get(`http://localhost:3000/appointments`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const allAppointments = async (token) => {
    return await axios.get(`http://localhost:3000/allAppointments`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const allInvoices = async (token) => {
    return await axios.get(`http://localhost:3000/invoices`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const newAppointment = async (token, body) => {
    return await axios.post(`http://localhost:3000/newAppointment`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}