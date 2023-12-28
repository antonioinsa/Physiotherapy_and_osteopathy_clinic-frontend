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

export const deleteCurrentAppointment = async (id, token) => {
    return await axios.delete(`http://localhost:3000/deleteAppointment/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteProfile = async (token) => {
    return await axios.delete(`http://localhost:3000/delete`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const manageWorkersData = async (token, body) => {
    return await axios.put(`http://localhost:3000/updateWorker`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const allWorkers = async (token) => {
    return await axios.get(`http://localhost:3000/allWorkers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteSaProfile = async (id, token) => {
    return await axios.delete(`http://localhost:3000/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const allUsers = async (token) => {
    return await axios.get(`http://localhost:3000/allUsers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const changeRoleUser = async (token, body) => {
    return await axios.put(`http://localhost:3000/changeRole`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const manageUsersData = async (token, body) => {
    return await axios.put(`http://localhost:3000/updateUser`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}