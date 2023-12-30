import React from "react";
import './Header.css';
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { logout, userData } from "../../pages/userSlice";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';




export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const rdxCredentials = useSelector(userData)

  const logOut = () => {
    dispatch(logout({ credentials: '', role: '' }))
    navigate('/')
  }

  const home = () => {
    navigate('/')
  }

  const about = () => {
    navigate('/about')
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
    navigate('/saUsers')
  }

  const invoices = () => {
    navigate('/myInvoices')
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
    <Col sm={12} lg={6} xl={4} xxl={3} className="headerDesign">
      <Navbar expand="lg" className="customNavBar">
        <Container>
          <Navbar.Brand href="#home">
            <div className="insideLogoDesign">
            <Image
              className="logoImage"
              src="../src/images/logo_mini.png"
              alt="Pterion"
            />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav style={{ marginLeft: 'auto' }}>
              {rdxCredentials?.credentials ? (
                <>
                  {rdxCredentials.role === 'user' && (
                    <Nav.Link className="font-weight-bold" onClick={home}>Home</Nav.Link>
                  )}
                  {rdxCredentials.role === 'user' && (
                    <Nav.Link className="font-weight-bold" onClick={about}>About</Nav.Link>
                  )}
                  {rdxCredentials.role === 'user' && (
                    <Nav.Link className="font-weight-bold" onClick={account}>Account</Nav.Link>
                  )}
                  {rdxCredentials.role === 'admin' && (
                    <Nav.Link className="font-weight-bold" onClick={mySpace}>My Space</Nav.Link>
                  )}
                  {rdxCredentials.role === 'superAdmin' && (
                    <Nav.Link className="font-weight-bold" onClick={saSpace}>My Space</Nav.Link>
                  )}
                  {rdxCredentials.role === 'user' && (
                    <Nav.Link className="font-weight-bold" onClick={appointments}>Appointments</Nav.Link>
                  )}
                  {rdxCredentials.role === 'user' && (
                    <Nav.Link className="font-weight-bold" onClick={newAppointment}>New Appointment</Nav.Link>
                  )}
                  {rdxCredentials.role === 'superAdmin' && (
                    <>
                      <Nav.Link className="font-weight-bold" onClick={manageWorkers}>Manage Workers</Nav.Link>
                      <Nav.Link className="font-weight-bold" onClick={manageClients}>Manage Clients</Nav.Link>
                      <Nav.Link className="font-weight-bold" onClick={saInvoices}>Invoices</Nav.Link>
                    </>
                  )}
                  {rdxCredentials.role === 'user' && (
                    <Nav.Link className="font-weight-bold" onClick={invoices}>Invoices</Nav.Link>
                  )}
                  <Nav.Link className="font-weight-bold" onClick={logOut}>Log Out</Nav.Link>
                </>
              ) : (
                <Nav.Link className="font-weight-bold" href="/login">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Col>
  )
}

