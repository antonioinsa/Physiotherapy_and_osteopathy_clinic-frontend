import React from "react";
import './Header.css';
import { LinkButton } from "../LinkButton/LinkButton";
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";

export const Header = () => {
    const useDispatch = useDispatch();
  
    const rdxCredentials = useSelector(userData);
  
    const logOutMe = () => {
  
      dispatch(logout( {credentials : ""}))
  
      navigate("/")
  
    }
  
    return (
      <div className="headerDesign">
        <LinkButton path={"/"} title={"Home"} />
  
        {!rdxCredentials?.credentials.token ? (
          <>
            <LinkButton path={''} title={"Login"} />
            <LinkButton path={''} title={"Register"} />
          </>
        ) : (
          <>
            <LinkButton path={''} title={rdxCredentials.credentials.firstName} />
            <div onClick={logOutMe}>
              <LinkButton path={"/"} title={"log out"} />  
            </div>
          </>
        )}
      </div>
    );
};