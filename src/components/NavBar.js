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

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">SkiGuide</NavbarBrand>
        {authToken ? <>
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
          <NavItem>
            <NavLink href="/about">How to Use</NavLink>
          </NavItem>
        </Nav> 
        <Nav className="ml-auto">  
        <NavLink className="btn" onClick={logOut}>Logout</NavLink> 
        </Nav>
        </>
          :
        <Nav className="ml-auto">  
          <NavItem>
            <NavLink className="float-right" href="/login">Login/Sign Up</NavLink>
          </NavItem>
        </Nav>
        }
      </Navbar>
    </div>
  );
}

export default NavBar;
