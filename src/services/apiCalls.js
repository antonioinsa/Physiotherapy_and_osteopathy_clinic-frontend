import axios from 'axios';

export const loginUsers = async (body) => {
    return await axios.post(`http://localhost:3000/login`, body);
}

export const registerUsers = async (body) => {
    return await axios.post(`http://localhost:3000/register`, body);

}

export const accountUser = async (token) => {
    return await axios.get (`http://localhost:3000/account`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateUser = async (token, body) => {
    return await axios.put (`http://localhost:3000/update`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updatePasswordUser = async (token, body) => {
    return await axios.put (`http://localhost:3000/updatePassword`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const invoicesUser = async (token) => {
    return await axios.get (`http://localhost:3000/myInvoices`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}