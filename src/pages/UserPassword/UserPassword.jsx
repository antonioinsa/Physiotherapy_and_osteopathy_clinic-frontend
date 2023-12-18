import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPasswordForChange, updatePasswordUser } from "../../services/apiCalls";

export const ChangePassword = () => {

    const userDataRdx = useSelector(userData)
    const token = userDataRdx.credentials
    const role = userDataRdx.role
    const navigate = useNavigate()

    useEffect(() => {
        if (!token || !role) {
            navigate('/')
        }
    }, [userDataRdx])

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const [passwordError, setPasswordError] = useState({
        currentPasswordError: '',
        newPasswordError: '',
        confirmPasswordError: '',
    })

    const [errorMsg, setErrorMsg] = useState('')

    const [isEnabled, setIsEnabled] = useState(true)

    const functionPassword = (e) => {
        setPassword((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const errorCheck = (e) => {
        let error = '';
        error = validator(e.target.name === 'newPassword' ||
            e.target.name === 'confirmPassword', e.target.value)
        setPasswordError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }))
    }

    const clearError = (e) => {
        setPasswordError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: '',
        }))
    }

    useEffect(() => {
        const getPassword = async () => {
            try {
                const response = await getPasswordForChange(token)
                setPassword((prevState) => ({
                    ...prevState,
                    currentPassword: response.data.password,
                }))
            } catch (error) {
                setErrorMsg(error.response.data.message)
            }
        }
        getPassword()
    }, [token])

    const updatePassword = async () => {
        if (password.currentPassword === '' ||
            password.newPassword === '' ||
            password.confirmPassword === '') {
            setErrorMsg('All fields are mandatory')
            return
        }

        if (password.newPassword !== password.confirmPassword) {
            setErrorMsg('New password and confirmation must match')
            return
        }

        try {
            const response = await getPasswordForChange(token)
            const isPasswordValid = response.data.data.password === password.currentPassword

            if (!isPasswordValid) {
                setErrorMsg('The current password is not valid')
                return
            }

            const body = {
                password: password.newPassword
            }

            const updateResponse = await updatePasswordUser(token, body)

            setPassword((prevState) => ({
                ...prevState,
                newPassword: updateResponse.data.data.password,
            }))

            setIsEnabled(true)
            setErrorMsg('Password successfully updated')
        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
    }

    const cancelChange = () => {
        setIsEnabled(true)
        navigate('/account')
    }

    return (
        <div className='changePasswordDesign'>
            <div className="passwordDesign">
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'password'}
                    name={'currentPassword'}
                    placeholder={'currentPassword'}
                    value={password.currentPassword}
                    functionProp={functionPassword}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{passwordError.currentPasswordError}</div>
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'password'}
                    name={'newPassword'}
                    placeholder={'newPassword'}
                    value={password.newPassword}
                    functionProp={functionPassword}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{passwordError.newPasswordError}</div>
                <CustomInput
                    disabled={isEnabled}
                    design={'inputDesign'}
                    type={'password'}
                    name={'confirmPassword'}
                    placeholder={'confirmPassword'}
                    value={password.confirmPassword}
                    functionProp={functionPassword}
                    functionBlur={errorCheck}
                    functionFocus={clearError}
                />
                <div className='MsgError'>{passwordError.confirmPasswordError}</div>
                {
                    isEnabled
                        ? (
                            <div className="editButton" onClick={() => { setIsEnabled(!isEnabled); functionPassword(); }}>Confirm change</div>
                        ) :
                        (
                            <>
                                <div className="cancelButton" onClick={() => cancelChange()}>Cancel</div>
                                <div className="spaceBetweenButtons"></div>
                                <div className="sendButton" onClick={() => updatePassword()}>Update</div>
                                <div className='errorMsg'>{errorMsg}</div>
                            </>
                        )
                }
            </div>
        </div>
    )
}
