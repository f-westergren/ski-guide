import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';
import Search from './Search';
import NavBar from './NavBar';
import Guide from './Guide';
import Login from './Login';
import Profile from './Profile'
import MessageList from './MessageList';
import { AuthContext } from './context/auth';
import ReservationList from './ReservationList';
import GuideForm from './GuideForm';

const Routes = () => {
  const existingToken = localStorage.getItem('token')
  const [authToken, setAuthToken] = useState(existingToken);

  const setToken = (token) => {
    if (!token) {
      localStorage.removeItem('token')
    } else {
      localStorage.setItem('token', token);
    }
    setAuthToken(token)
  }
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <BrowserRouter>
        <NavBar />
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/guides/:id" component={Guide} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/profile/guide" component={GuideForm} />
            <PrivateRoute exact path="/messages" component={MessageList} />
            <PrivateRoute exact path="/reservations" component={ReservationList} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default Routes;