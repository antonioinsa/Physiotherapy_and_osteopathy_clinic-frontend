import React from "react";
import './Header.css';
import { LinkButton } from "../LinkButton/LinkButton";



export const Header = () => {
  return (
    <div className="headerDesign">
      <div className="logoDesign">
        <div className="insideLogoDesign">
          <img src="../src/images/logo_mini.png" width="60" height="60"></img>
        </div>
        <div className="clinicName">Pterion Pysiotherapy and Osteopathy Clinic</div>
      </div>
      <div className="buttonsDesign">
        <div><LinkButton path={'/'} title={'Home'}></LinkButton></div>
        <div><LinkButton path={'/about'} title={'About'}></LinkButton></div>
        <div><LinkButton path={'/login'} title={'Login'}></LinkButton></div>
        <div><LinkButton path={'/'} title={'Appointments'}></LinkButton></div>
        <div><LinkButton path={'/'} title={'Account'}></LinkButton></div>
        <div><LinkButton path={'/'} title={'Manage Workers'}></LinkButton></div>
        <div><LinkButton path={'/'} title={'Manage Clients'}></LinkButton></div>
        <div><LinkButton path={'/'} title={'Invoices'}></LinkButton></div>
        <div><LinkButton path={'/'} title={'LogOut'}></LinkButton></div>
      </div>
    </div>
  );
};