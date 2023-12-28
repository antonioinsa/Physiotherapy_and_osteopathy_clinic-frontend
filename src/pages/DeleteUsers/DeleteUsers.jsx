import React, { useEffect, useState } from 'react';
import './DeleteUsers.css';
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from '../userSlice';
import { useNavigate } from 'react-router';
import { deleteProfile } from '../../services/apiCalls';

export const DeleteUsers = () => {
    const userDataRdx = useSelector(userData)
    const token = userDataRdx.credentials
    const role = userDataRdx.role
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errorMsg, setErrorMsg] = useState('')
    const [successfully, setSuccessfully] = useState('')

    useEffect(() => {
        if (!token && role !== 'user') {
            navigate('/')
        }
    }, [userDataRdx])

    const logOut = () => {
        dispatch(logout({ credentials: "", role: "" }))
        navigate("/")
    }

    const deleteUser = async () => {
        try {
            const response = await deleteProfile(token)
            if (response.status === 200) {
                setSuccessfully(response.data.message)
                logOut()
            }

        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
    }

    const CancelDeleteUser = () => {
        navigate('/')
    }


    return (
        <div className="deleteUserDesign">
            <div className='alertMessage'>
                <p>"Warning! You are about to permanently delete your account.</p>
                <p>This action cannot be undone and will result in the irreversible loss of all your data.</p>
                <p>Are you sure you want to proceed with the account deletion?"</p>
            </div>
            <div >
                <button className='buttonToDelete' onClick={deleteUser}>Delete User</button>
            </div>
            <div className='spaceBetweenButtonAndMessage'></div>
            <div >
                <button className='buttonToCancelAccount' onClick={CancelDeleteUser}>Cancel account deletion</button>
            </div>
            <div className='spaceBetweenButtonAndMessage'></div>
            <div className='successfully'>{successfully}</div>
            <div className='error'>{errorMsg}</div>
        </div>
    )
}