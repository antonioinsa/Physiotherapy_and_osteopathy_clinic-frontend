import React from "react";
import './Header.css';
import { LinkButton } from "../LinkButton/LinkButton";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { logout, userData } from "../../pages/userSlice";

export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const rdxCredentials = useSelector(userData)

  const logOut = () => {
    dispatch(logout({ credentials: '', role: '' }))
    navigate('/')
  }

  const account = () => {
    navigate('/account')
  }

  const appointments = () => {
    navigate('/appointments')
  }

  const manageWorkers = () => {
    navigate('/manageWorkers')
  }

  const manageClients = () => {
    navigate('/manageClients')
  }

  const invoices = () => {
    navigate('/invoices')
  }

  return (
    <div className="headerDesign">
      <div className="logoDesign">
        <div className="insideLogoDesign">
          <img src="../src/images/logo_mini.png" width="60" height="60"></img>
        </div>
        <div className="clinicName">Pterion Pysiotherapy and Osteopathy Clinic</div>
      </div>
      <div className="buttonsDesign">
        <>
          {location.pathname !== '/manageWorkers' &&
            location.pathname !== '/manageClients' &&
            location.pathname !== '/invoices' && (
              <div><LinkButton path={'/'} title={'Home'}></LinkButton></div>
            )}
          {location.pathname !== '/manageWorkers' &&
            location.pathname !== '/manageClients' &&
            location.pathname !== '/invoices' && (
              <div><LinkButton path={'/about'} title={'About'}></LinkButton></div>
            )}
        </>
        {rdxCredentials?.credentials ? (
          <>
            {location.pathname !== '/manageWorkers' &&
              location.pathname !== '/manageClients' &&
              location.pathname !== '/invoices' && (
                <div onClick={account}><LinkButton path={'/'} title={'Account'}></LinkButton></div>
              )}
            {location.pathname !== '/manageWorkers' &&
              location.pathname !== '/manageClients' &&
              location.pathname !== '/invoices' && (
                <div onClick={appointments}><LinkButton path={'/'} title={'Appointments'}></LinkButton></div>
              )}
            {location.pathname !== '/manageWorkers' &&
              location.pathname !== '/manageClients' &&
              location.pathname !== '/invoices' && (
                <div onClick={manageWorkers}><LinkButton path={'/'} title={'Manage Workers'}></LinkButton></div>
              )}
            {location.pathname !== '/manageWorkers' &&
              location.pathname !== '/manageClients' &&
              location.pathname !== '/invoices' && (
                <div onClick={manageClients}><LinkButton path={'/'} title={'Manage Clients'}></LinkButton></div>
              )}
            {location.pathname !== '/manageWorkers' &&
              location.pathname !== '/manageClients' &&
              location.pathname !== '/invoices' && (
                <div onClick={invoices}><LinkButton path={'/'} title={'Invoices'}></LinkButton></div>
              )}
            <div onClick={logOut}><LinkButton path={'/'} title={'LogOut'}></LinkButton></div>
          </>
        ) : (
          <div><LinkButton path={'/login'} title={'Login'}></LinkButton></div>
        )}
      </div>
    </div>
  )
}