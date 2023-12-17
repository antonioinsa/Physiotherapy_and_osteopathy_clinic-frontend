import React, { useEffect, useState } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { loginUsers } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";
import { Link } from 'react-router-dom';
//import { useDispatch, useSelector } from "react-redux";
import { login, role, userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";

export const Login = () => {

  const navigate = useNavigate();
  //const dispatch = useDispatch();
  //const rdxUserData = useSelector(userData)

  const [auth, setAuth] = useState({
    email: "",
    password: "",
  })

  const functionHandler = (e) => {
    setAuth((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const [authError, setAuthError] = useState({
    email: '',
    password: ''
  })

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setAuthError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }));
  }


  // useEffect(() => {
  //   if (rdxUserData.credentials) {
  //     navigate("/")
  //   }
  // }, [rdxUserData])

  const SendCredentials = () => {
    for (let test1 in auth) {
      if (auth[test1] === "") {
        return;
      }
    }
    for (let test in authError) {
      if (authError[test] !== "") {
        return;
      }
    }

    loginUsers(auth)
      .then(
        (response) => {
          if (response.error) {
            setError("Invalid Email or Password")
          } else {
            //dispatch(login({ credentials: response.data.token }))
            let decoded = jwtDecode(response.data.token)
            dispatch(login({ role: decoded.role }))

            setTimeout(() => {
              if (decoded.role !== "superAdmin") {
                navigate("/saProfile")
              } else if (decoded.role !== "admin") {
                navigate("/workerProfile")
              } else {
                navigate("/")
              }

            }, 500);
          }
        }
      )
      .catch((error) => {
        console.log(error);
        setMsgError(error.message);
      });
  }

  return (
    <div className="inputsDesign">
      <div>
        <div className="loginDesign">
          <div className="space"></div>
          <CustomInput
            disabled={false}
            design={`inputDesign ${authError.emailError !== "" ? 'inputDesign' : ''}`}
            type={"email"}
            name={"email"}
            placeholder={"example@example.com"}
            value={""}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <div className='MsgError'>{authError.emailError}</div>
          <CustomInput
            disabled={false}
            design={`inputDesign ${authError.passwordError !== "" ? 'inputDesign' : ''}`}
            type={"password"}
            name={"password"}
            placeholder={"PASSWORD"}
            value={""}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <div className='MsgError'>{authError.passwordError}</div>
          <div className='registerButtonDesign'>
            <Link to="/register"></Link>Are You registered?
          </div>
          <div className='buttonSendCredentials' onClick={SendCredentials}>Login</div>

        </div>
      </div>
    </div>

  );
};
