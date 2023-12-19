import "./UserPassword.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { accountData } from "../accountSlice";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { updatePasswordUser } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";

export const ChangePassword = () => {
  const userDataRdx = useSelector(userData)
  const token = userDataRdx.credentials
  const role = userDataRdx.role
  const passwordRdx = useSelector(accountData)
  const pass = passwordRdx.password
  //console.log(passwordRdx)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token || !role) {
      navigate("/")
    }
  }, [userDataRdx])

  const [newPassword, setNewPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [passwordError, setPasswordError] = useState({
    newPasswordError: '',
    confirmPasswordError: '',
  })

  const [errorMsg, setErrorMsg] = useState('')
  const [isEnabled, setIsEnabled] = useState(true)

  const functionPassword = (e) => {
    setNewPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const errorCheck = (e) => {
    let error = ''
    error = validator(e.target.name, e.target.value)
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
  //console.log('llega1')
  useEffect(() => {
    const getPasswordUser = async () => {
      try {
        //console.log('llega2')
        const response = await accountUser(token)
        //console.log(response.data.data.password)
        //console.log('llega3')
        setNewPassword(response.data.data.password)
      } catch (error) {
        setErrorMsg(error.response.data.message)
      }
    }
    getPasswordUser();
  }, [token])
  //console.log('llega4')
  const updatePassword = async () => {
    if (newPassword.newPassword === '' || newPassword.confirmPassword === '') {
      setErrorMsg('All fields are mandatory')
      return
    }

    if (newPassword.newPassword !== newPassword.confirmPassword) {
      setErrorMsg('New password and confirmation must match')
      return
    }

    try {
      const isPasswordValid =
        userDataRdx.credentials.password === newPassword.currentPassword

      if (!isPasswordValid) {
        setErrorMsg('The current password is not valid')
        return
      }

      const body = {
        password: newPassword.newPassword,
      }

      const updateResponse = await updatePasswordUser(token, body)

      setNewPassword((prevState) => ({
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
    <div className="changePasswordDesign">
      <div className="passwordDesign">
        <CustomInput
          disabled={isEnabled}
          design={'inputDesign'}
          type={'password'}
          name={'newPassword'}
          placeholder={'New password'}
          value={newPassword.newPassword}
          functionProp={functionPassword}
          functionBlur={errorCheck}
          functionFocus={clearError}
        />
        <div className="MsgError">{passwordError.newPasswordError}</div>
        <CustomInput
          disabled={isEnabled}
          design={'inputDesign'}
          type={'password'}
          name={'confirmPassword'}
          placeholder={'Confirm password'}
          value={newPassword.confirmPassword}
          functionProp={functionPassword}
          functionBlur={errorCheck}
          functionFocus={clearError}
        />
        <div className="MsgError">{passwordError.confirmPasswordError}</div>
        {isEnabled ? (
          <div
            className="editButton"
            onClick={() => { setIsEnabled(!isEnabled); getPasswordUser(); }}
          >
            click to Enable
          </div>
        ) : (
          <>
            <div className="spaceBetweenButtons"></div>
            <div
              className="sendButton"
              onClick={() => updatePassword()}
            >
              Update
            </div>
            <div className="spaceBetweenButtons"></div>
            <div
              className="cancelButton"
              onClick={() => cancelChange()}
            >
              Cancel
            </div>
            <div className="errorMsg">{errorMsg}</div>
          </>
        )}
      </div>
    </div>
  );
};
