import React, { useState } from "react";
import './Header.css';
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, userData } from "../../pages/userSlice";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const rdxCredentials = useSelector(userData)
  const [navbarExpanded, setNavbarExpanded] = useState(false)

  const logOut = () => {
    dispatch(logout({ credentials: '', role: '' }))
    navigate('/')
  }

  const handleNavbarToggle = () => {
    setNavbarExpanded(!navbarExpanded)
  }


  return (
    <Col sm={12} lg={6} xl={4} xxl={3} className={`headerDesign ${navbarExpanded ? 'expanded' : ''}`}>
      <Navbar expand="lg" className="customNavBar" onToggle={handleNavbarToggle} expanded={navbarExpanded}>
        <Container>
          <Navbar.Brand as={Link} to="/">
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
            <Nav className="ms-auto">
              {rdxCredentials?.credentials ? (
                <>
                  {rdxCredentials.role !== 'admin' && rdxCredentials.role !== 'superAdmin' && (
                    <Nav.Link className="font-weight-bold" as={Link} to="/" onClick={() => setNavbarExpanded(false)}>Home</Nav.Link>
                  )}
                  {rdxCredentials.role !== 'admin' && rdxCredentials.role !== 'superAdmin' && (
                    <Nav.Link className="font-weight-bold" as={Link} to="/about" onClick={() => setNavbarExpanded(false)}>About</Nav.Link>
                  )}
                  {rdxCredentials.role === 'user' && (
                    <Nav.Link className="font-weight-bold" as={Link} to="/account" onClick={() => setNavbarExpanded(false)}>Account</Nav.Link>
                  )}
                  {rdxCredentials.role === 'admin' && (
                    <Nav.Link className="font-weight-bold" as={Link} to="/workerSpace" onClick={() => setNavbarExpanded(false)}>My Space</Nav.Link>
                  )}
                  {rdxCredentials.role === 'superAdmin' && (
                    <Nav.Link className="font-weight-bold" as={Link} to="/saProfile" onClick={() => setNavbarExpanded(false)}>My Space</Nav.Link>
                  )}
                  {rdxCredentials.role === 'user' && (
                    <Nav.Link className="font-weight-bold" as={Link} to="/myAppointments" onClick={() => setNavbarExpanded(false)}>Appointments</Nav.Link>
                  )}
                  {rdxCredentials.role === 'user' && (
                    <Nav.Link className="font-weight-bold" as={Link} to="/newAppointment" onClick={() => setNavbarExpanded(false)}>New Appointment</Nav.Link>
                  )}
                  {rdxCredentials.role === 'superAdmin' && (
                    <>
                      <Nav.Link className="font-weight-bold" as={Link} to="/saWorkers" onClick={() => setNavbarExpanded(false)}>Manage Workers</Nav.Link>
                      <Nav.Link className="font-weight-bold" as={Link} to="/saUsers" onClick={() => setNavbarExpanded(false)}>Manage Clients</Nav.Link>
                      <Nav.Link className="font-weight-bold" as={Link} to="/saInvoices" onClick={() => setNavbarExpanded(false)}>Invoices</Nav.Link>
                    </>
                  )}
                  {rdxCredentials.role === 'user' && (
                    <Nav.Link className="font-weight-bold" as={Link} to="/myInvoices" onClick={() => setNavbarExpanded(false)}>Invoices</Nav.Link>
                  )}
                  <Nav.Link className="font-weight-bold" onClick={logOut}>Log Out</Nav.Link>
                </>
              ) : (
                <>
                  {rdxCredentials.role !== 'admin' && rdxCredentials.role !== 'superAdmin' && (
                    <Nav.Link className="font-weight-bold" as={Link} to="/" onClick={() => setNavbarExpanded(false)}>Home</Nav.Link>
                  )}
                  {rdxCredentials.role !== 'admin' && rdxCredentials.role !== 'superAdmin' && (
                    <Nav.Link className="font-weight-bold" as={Link} to="/about" onClick={() => setNavbarExpanded(false)}>About</Nav.Link>
                  )}
                  <Nav.Link className="font-weight-bold" as={Link} to="/login" onClick={() => setNavbarExpanded(false)}>Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Col>
  )
}
