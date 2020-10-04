import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { useAuth } from './context/auth';

const NavBar = () => {
  const { setAuthToken, authToken } = useAuth();
  const history = useHistory()

  const logOut = () => {
    setAuthToken();
    history.push('/');
  }

  function loggedOutNav() {
    return (
      <Nav className="ml-auto"> 
        <NavLink className="btn float-right" href="/login">Login/Sign Up</NavLink>
      </Nav>
    )
  }
  function loggedInNav() {
    return (
      <>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/profile">Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/messages">Inbox</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/reservations">Reservations</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/favorites">Favorites</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto">  
          <NavLink className="btn float-right" onClick={logOut}>Logout</NavLink> 
        </Nav>
      </>
    );
  }

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">SkiGuide</NavbarBrand>
      { authToken ? loggedInNav() : loggedOutNav() }
    </Navbar>
  )
}

export default NavBar;
