import "./UserPassword.css";
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePasswordUser, accountUser } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";

export const ChangePassword = () => {
  const userDataRdx = useSelector(userData)
  const dispatch = useDispatch()
  const token = userDataRdx.credentials
  const role = userDataRdx.role
  const navigate = useNavigate()

  const [successfully, setSuccessfully] = useState('')
  const [errorMsg, setErrorMsg] = useState("")
  const [isEnabled, setIsEnabled] = useState(true)
  const [isUpdateEnabled, setIsUpdateEnabled] = useState(false)

  useEffect(() => {
    if (!token || !role) {
      navigate("/")
    }
  }, [userDataRdx])

  const logOut = () => {
    dispatch(logout({ credentials: "", role: "" }))
    navigate("/")
  }

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [passwordError, setPasswordError] = useState({
    currentPasswordError: "",
    newPasswordError: "",
    confirmPasswordError: "",
  })

  const handlePassword = (e) => {
    setPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setPasswordError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }))
  }

  const clearError = (e) => {
    setPasswordError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: "",
    }))
  }

  const checkCurrentPassword = async () => {
    try {
      if (password.currentPassword === "") {
        setErrorMsg("Current password is mandatory")
        return
      }
  
      const response = await accountUser(token)

      if (response.data.success === true) {
        setIsEnabled(false)
        setIsUpdateEnabled(true)
        successfully("current password is correct")
      } 
      
    } catch (error) {
      setErrorMsg(error.response.data.message)
    }
  }

  const updatePassword = async () => {
    if (password.newPassword === "" || password.confirmPassword === "") {
      setErrorMsg("All fields are mandatory")
      return
    }

    if (password.newPassword !== password.confirmPassword) {
      setErrorMsg("New password and the confirmation must match")
      return
    }
    try {
      const body = { password:password.currentPassword, newPassword:password.newPassword }

      const updateResponse = await updatePasswordUser(token, body)

      setPassword((prevState) => ({
        ...prevState,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))

      if (updateResponse.data.success === true) {
        setSuccessfully(updateResponse.data.message)
        logOut()
      } else {
        setErrorMsg(updateResponse.data.message)
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message)
    }
  }

  const cancelChange = () => {
    setIsEnabled(!isEnabled)
    navigate("/account")
  }

  const deleteUser = () => {
    navigate("/delete")
  }

  return (
    <div className="changePasswordDesign">
      <div className="passwordCardDesign">
        <CustomInput
          disabled={!isEnabled}
          design={"inputDesign"}
          type={"password"}
          name={"currentPassword"}
          placeholder={"Current password"}
          value={password.currentPassword}
          functionProp={handlePassword}
          functionBlur={errorCheck}
          functionFocus={clearError}
        />
        <div className="errorMsg">{passwordError.currentPasswordError}</div>
        <CustomInput
          disabled={isEnabled}
          design={"inputDesign"}
          type={"password"}
          name={"newPassword"}
          placeholder={"New password"}
          value={password.newPassword}
          functionProp={handlePassword}
          functionBlur={errorCheck}
          functionFocus={clearError}
        />
        <div className="errorMsg">{passwordError.newPasswordError}</div>
        <CustomInput
          disabled={isEnabled}
          design={"inputDesign"}
          type={"password"}
          name={"confirmPassword"}
          placeholder={"Confirm password"}
          value={password.confirmPassword}
          functionProp={handlePassword}
          functionBlur={errorCheck}
          functionFocus={clearError}
        />
        <div className="errorMsg">{passwordError.confirmPasswordError}</div>
        {isEnabled ? (
          <div
            className="editButton"
            onClick={() => { checkCurrentPassword(); }}>
            Click to Enable
          </div>
        ) : (
          <>
            <div className="spaceBetweenButtons"></div>
            <div className="deletePasswordButton" onClick={() => deleteUser()}>
              Delete account permanently</div>
            <div className="spaceBetweenButtons"></div>
            <div className="sendPasswordButton" onClick={() => updatePassword()}>
              Update password
            </div>
            <div className="spaceBetweenButtons"></div>
            <div className="cancelPasswordButton" onClick={() => cancelChange()}>
              Cancel
            </div>
            <div className="errorMsg">{errorMsg}</div>
            <div className='successfully'>{successfully}</div>
          </>
        )}
      </div>
    </div>
  )
}
