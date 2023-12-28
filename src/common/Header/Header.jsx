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
    navigate('/myAppointments')
  }

  const newAppointment = () => {
    navigate('/newAppointment')
  }

  const manageWorkers = () => {
    navigate('/saWorkers')
  }

  const manageClients = () => {
    navigate('/manageClients')
  }

  const invoices = () => {
    navigate('/invoices')
  }

  const mySpace = () => {
    navigate('/workerSpace')
  }

  const saSpace = () => {
    navigate('/saProfile')
  }

  const saInvoices = () => {
    navigate('/saInvoices')
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
        {rdxCredentials.role !== 'admin' &&  rdxCredentials.role !== 'superAdmin' && (
          <>
            {(
              <div><LinkButton path={'/'} title={'Home'}></LinkButton></div>
            )}
            {(
              <div><LinkButton path={'/about'} title={'About'}></LinkButton></div>
            )}
          </>
        )}
        {rdxCredentials?.credentials ? (
          <>
            {rdxCredentials.role === 'user' && (
              <div onClick={account}><LinkButton path={'/account'} title={'Account'}></LinkButton></div>
            )}
            {rdxCredentials.role === 'admin' && (
              <div onClick={mySpace}><LinkButton path={'/workerSpace'} title={'My Space'}></LinkButton></div>
            )}
            {rdxCredentials.role === 'superAdmin' && (
              <div onClick={saSpace}><LinkButton path={'/saProfile'} title={'My Space'}></LinkButton></div>
            )}
            {rdxCredentials.role === 'user' && (
              <div onClick={appointments}><LinkButton path={'/myAppointments'} title={'Appointments'}></LinkButton></div>
            )}
            {rdxCredentials.role === 'user' && (
              <div onClick={newAppointment}><LinkButton path={'/newAppointment'} title={'New appointment'}></LinkButton></div>
            )}
            {rdxCredentials.role === 'superAdmin' && (
              <>
                {(
                  <div onClick={manageWorkers}><LinkButton path={'/saWorkers'} title={'Manage Workers'}></LinkButton></div>
                )}
                {(
                  <div onClick={manageClients}><LinkButton path={'/manageClients'} title={'Manage Clients'}></LinkButton></div>
                )}
                {(
                  <div onClick={saInvoices}><LinkButton path={'/saInvoices'} title={'Invoices'}></LinkButton></div>
                )}
                {rdxCredentials.role === 'user' && (
                  <div onClick={invoices}><LinkButton path={'/invoices'} title={'Invoices'}></LinkButton></div>
                )}
              </>
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