import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
  ButtonGroup,
  Button, 
  Card, 
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import SkiGuideApi from '../SkiGuideApi';
import { useAuth } from './context/auth';
import getFromToken from '../utils';

const Login = () => {
  let initialState = {
    'email': '', 
    'password': '', 
    'first_name': '', 
    'last_name': '',
    'skill_level': '',
    'image_url': ''
  }

  const [formData, setFormData] = useState(initialState);
  const [rSelected, setRSelected] = useState('login');
  const [error, setError] = useState('');
  const { authToken, setAuthToken } = useAuth();
  const history = useHistory();

  const user = getFromToken(authToken, 'id');
  const fields = rSelected === 'login' ? ['email', 'password'] : Object.keys(initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    let res;
    try {
      if (rSelected === 'login') {
        res = await SkiGuideApi.login(formData.email, formData.password);
      } else if (rSelected === 'signup') {
        res = await SkiGuideApi.registerUser(formData);
      }
      setAuthToken(res.token);
      history.push('/')  
    } catch(err) {
      setError(err)
    }
  }

  if(user) {
    return <Redirect to="/" />
  }

    return (
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <div className="d-flex justify-content-end mt-5">
        <ButtonGroup>
          <Button color="primary" onClick={() => setRSelected('login')} active={rSelected === 'login'}>Log in</Button>
          <Button color="primary" onClick={() => setRSelected('signup')} active={rSelected === 'signup'}>Sign up</Button>
        </ButtonGroup>
      </div>
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              {fields.map((field, idx) => 
                <FormGroup key={idx}>
                  <Label className="font-weight-bold text-capitalize" for={field}>
                    {(field.indexOf('_') === -1) ? field : field.replace('_', ' ')}
                  </Label>
                  <Input 
                    className='form-control' 
                    type={(field === 'password' || field === 'email') ? field : 'text'} 
                    name={field} 
                    id={field}
                    onChange={handleChange}
                    value={formData[field]}
                    minLength={(field === 'password' ||field === 'email') ? 5 : 1}
                    required={field !== 'image_url'}
                  />
                </FormGroup>
              )}
              {error && <span className="text-danger">{error}</span>}
              <Button className="float-right" color="primary">Submit</Button>
            </Form>
          </CardBody>
        </Card>
    </div>
    )
}

export default Login;