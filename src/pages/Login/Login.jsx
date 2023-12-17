import React, { useEffect, useState } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { loginUsers } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { LinkButton } from "../../common/LinkButton/LinkButton";


export const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const rdxUserData = useSelector(userData)

  const [auth, setAuth] = useState({
    email: "",
    password: "",
  })

  const [authError, setAuthError] = useState({
    emailError: '',
    passwordError: ''
  })

  const [errorMsg, setErrorMsg] = useState('')

  const functionHandler = (e) => {
    setAuth((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value)
    setAuthError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }))
  }

  const clearError = (e) => {
    setAuthError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: '',
    }))
  }

  const SendCredentials = () => {
    loginUsers(auth)
      .then(
        (response) => {
          if (response.error) {
            setErrorMsg(response.data.message);
            console.log(response.data.message);
          } else {
            dispatch(login({ credentials: response.data.token }))
            let decoded = jwtDecode(response.data.token)
            console.log(decoded);
            dispatch(login({ role: decoded.role }))

            setTimeout(() => {
              if (decoded.role !== "superAdmin") {
                navigate("/saProfile")
              } else if (decoded.role !== "admin") {
                navigate("/workerProfile")
              } else {
                navigate("/")
              }

            }, 500)
          }
        }
      )
      .catch((error) => {
        setErrorMsg(error.response.data.message)
      })
  }

  return (
    <div className="inputsDesign">
      <div>
        <div className="loginDesign">
          <div className="space"></div>
          <CustomInput
            disabled={false}
            design={"inputDesign"}
            type={"email"}
            name={"email"}
            placeholder={"example@example.com"}
            value={""}
            functionProp={functionHandler}
            functionBlur={errorCheck}
            functionFocus={clearError}
          />
          <div className='MsgError'>{authError.emailError}</div>
          <CustomInput
            disabled={false}
            design={"inputDesign"}
            type={"password"}
            name={"password"}
            placeholder={"PASSWORD"}
            value={""}
            functionProp={functionHandler}
            functionBlur={errorCheck}
            functionFocus={clearError}
          />
          <div className='MsgError'>{authError.passwordError}</div>
          <div className='errorMsg'>{errorMsg}</div>
          <div className='buttonSendCredentials' onClick={SendCredentials}>Login</div>
          <div className='registerButtonDesign'>
            <LinkButton path={'/register'} title={'Are You registered?'}></LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
