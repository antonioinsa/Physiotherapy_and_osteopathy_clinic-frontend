import axios from 'axios';

export const loginUsers = async (body) => {
    return await axios.post(`http://localhost:3000/login`, body);
}

export const registerUsers = async (body) => {
    return await axios.post(`http://localhost:3000/register`, body);

}