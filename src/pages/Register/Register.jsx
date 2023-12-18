import React, { useState } from "react";
import "./Register.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { registerUsers } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";

export const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        documentId: '',
        street: '',
        door: '',
        zipCode: '',
        town: '',
        country: ''
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

    const registerButton = () => {

        if (user.name === '' || user.lastName === '' ||
            user.phone === '' || user.email === '' ||
            user.password === '' || user.documentId === '' ||
            user.street === '' || user.door === '' ||
            user.zipCode === '' || user.town === '' ||
            user.country === '') {
            return
        }

        registerUsers(user)
            .then(
                (response) => {
                    if (response.error) {
                        setErrorMsg(response.data.message)
                    } else {
                        setTimeout(() => {
                            navigate('/login')
                        }, 500)
                    }
                }
            )
            .catch((error) => {
                setErrorMsg(error.response.data.message)
            })
    }

    return (
        <div className='inputsDesign'>
            <div className="registerDesign">
                <CustomInput
                    disabled={false}
                    design={'inputDesign'}
                    type={'name'}
                    name={'name'}
                    placeholder={'Name'}
                    value={''}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.nameError}</div>
                <CustomInput
                    disabled={false}
                    design={'inputDesign'}
                    type={'lastName'}
                    name={'lastName'}
                    placeholder={'Last name'}
                    value={''}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.lastNameError}</div>
                <CustomInput
                    disabled={false}
                    design={'inputDesign'}
                    type={'phone'}
                    name={'phone'}
                    placeholder={'Phone number'}
                    value={''}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.phoneError}</div>
                <CustomInput
                    disabled={false}
                    design={'inputDesign'}
                    type={'email'}
                    name={'email'}
                    placeholder={'example@example.com'}
                    value={''}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.emailError}</div>
                <CustomInput
                    disabled={false}
                    design={'inputDesign'}
                    type={'password'}
                    name={'password'}
                    placeholder={'Password'}
                    value={''}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.passwordError}</div>
                <CustomInput
                    disabled={false}
                    design={'inputDesign'}
                    type={'dni'}
                    name={'documentId'}
                    placeholder={'Dni/Nif'}
                    value={''}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.documentIdError}</div>
                <CustomInput
                    disabled={false}
                    design={'inputDesign'}
                    type={'street'}
                    name={'street'}
                    placeholder={'Street'}
                    value={''}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.streetError}</div>
                <CustomInput
                    disabled={false}
                    design={'inputDesign'}
                    type={'door'}
                    name={'door'}
                    placeholder={'Door number'}
                    value={''}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.doorError}</div>
                <CustomInput
                    disabled={false}
                    design={'inputDesign'}
                    type={'zipCode'}
                    name={'zipCode'}
                    placeholder={'ZipCode'}
                    value={''}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.zipCodeError}</div>
                <CustomInput
                    disabled={false}
                    design={'inputDesign'}
                    type={'town'}
                    name={'town'}
                    placeholder={'Town/City'}
                    value={''}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.townError}</div>
                <CustomInput
                    disabled={false}
                    design={'inputDesign'}
                    type={'country'}
                    name={'country'}
                    placeholder={'Country'}
                    value={''}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{userError.countryError}</div>
                <div className='errorMsg'>{errorMsg}</div>
                <div className='buttonSubmit' onClick={registerButton}>Submit</div>
            </div>
        </div>
    )
}
