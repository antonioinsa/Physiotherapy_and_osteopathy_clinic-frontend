import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./Account.css";
import { userData } from '../userSlice';
import { accountUser } from '../../services/apiCalls';
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { Navigate } from 'react-router';


export const Account = () => {

    const userDataRdx = useSelector(userData)
    const token = userDataRdx.credentials
    const role = userDataRdx.role
    
    useEffect(() => {
        if (!token || role !== 'user') {
            Navigate('/')
        }
    }, [token, role])

    const [user, setUser] = useState({
        name: userDataRdx.credentials.name,
        lastName: userDataRdx.credentials.lastName,
        phone: userDataRdx.credentials.phone,
        email: userDataRdx.credentials.email,
        password: userDataRdx.credentials.password,
        documentId: userDataRdx.credentials.documentId,
        street: userDataRdx.credentials.street,
        door: userDataRdx.credentials.door,
        zipCode: userDataRdx.credentials.zipCode,
        town: userDataRdx.credentials.town,
        country: userDataRdx.credentials.country
    })

    const [userError, setUserError] = useState({
        nameError: '',
        lastNameError: '',
        phoneError: '',
        emailError: '',
        passwordError: '',
        documentIdError: '',
        streetError: '',
        doorError: '',
        zipCodeError: '',
        townError: '',
        countryError: ''
    })

    const [errorMsg, setErrorMsg] = useState('')

    const [isEnabled, setIsEnabled] = useState(true)

    const functionHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const errorCheck = (e) => {
        let error = '';
        error = validator(e.target.name, e.target.value)
        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }))
    }

    const clearError = (e) => {
        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: '',
        }))
    }

    useEffect(() => {
        const getAccountUser = async () => {
            try {
                const response = await accountUser(token)
                setUser(response.data.data)
            } catch (error) {
                setErrorMsg(error.response.data.message)
            }
        }
        getAccountUser()
    }, [token])

    const updateAccount = async () => {
        if (user.name === '' || user.lastName === '' ||
            user.phone === '' || user.email === '' ||
            user.password === '' || user.documentId === '' ||
            user.street === '' || user.door === '' ||
            user.zipCode === '' || user.town === '' ||
            user.country === '') {
            return
        }

        try {
            const body = {
                name: user.name,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                password: user.password,
                documentId: user.documentId,
                street: user.street,
                door: user.door,
                zipCode: user.zipCode,
                town: user.town,
                country: user.country
            }

            const response = await updateUser(token, body)
            setUser(response.data.data)
            setIsEnabled(true)
        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
    }

    const cancelEdit = async () => {
        setIsEnabled(true)
        try {
            const response = await accountUser(token)
            setUser(response.data.data)
        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
    }

    return (
        <div className='accountDesign'>
            <div className="editDesign">
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'name'}
                    name={'name'}
                    placeholder={''}
                    value={user.name}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.nameError}</div>
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'lastName'}
                    name={'lastName'}
                    placeholder={''}
                    value={user.lastName}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.lastNameError}</div>
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'phone'}
                    name={'phone'}
                    placeholder={''}
                    value={user.phone}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.phoneError}</div>
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'email'}
                    name={'email'}
                    placeholder={''}
                    value={user.email}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.emailError}</div>
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'password'}
                    name={'password'}
                    placeholder={''}
                    value={user.password}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.passwordError}</div>
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'dni'}
                    name={'documentId'}
                    placeholder={''}
                    value={user.documentId}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.documentIdError}</div>
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'street'}
                    name={'street'}
                    placeholder={''}
                    value={user.street}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.streetError}</div>
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'door'}
                    name={'door'}
                    placeholder={''}
                    value={user.door}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.doorError}</div>
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'zipCode'}
                    name={'zipCode'}
                    placeholder={''}
                    value={user.zipCode}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.zipCodeError}</div>
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'town'}
                    name={'town'}
                    placeholder={''}
                    value={user.town}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.townError}</div>
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'country'}
                    name={'country'}
                    placeholder={''}
                    value={user.country}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.countryError}</div>
                {
                    isEnabled
                        ? (
                            <div className="editButton" onClick={() => setIsEnabled(!isEnabled)}>Edit</div>
                        ) :
                        (
                            <>
                                <div className="cancelButton" onClick={() => cancelEdit()}>Cancel</div>
                                <div className="spaceBetweenButtons"></div>
                                <div className="sendButton" onClick={() => updateAccount()}>Send</div>
                                <div className='errorMsg'>{errorMsg}</div>
                            </>
                        )
                }
            </div>
        </div>
    )
}
